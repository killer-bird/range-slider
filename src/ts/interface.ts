export default class Controller {
    public model
    public view
    public sliderEdge: number
    public slider
    public pointers

    constructor(model, view) {
        this.model = model
        this.view = view
        this.renderView()
    }

    changeColorBar(color) {
        this.view.progressBar[0].style.background = color
    }

    changeColorPointer(color) {
        this.view.pointer.css('background', color)
    }

    updateSlider() {
        this.view.updateSlider()
        this.setDefaultValues()
        this.handlePointerEvent()
        this.handleScaleClicks()
        this.pointers = [this.view.pointer[0], this.view.pointer[1]]
    }

    renderView() {
        this.view.renderSlider()
        this.setDefaultValues()
        this.handlePointerEvent()
        this.handleScaleClicks()
        this.pointers = [this.view.pointer[0], this.view.pointer[1]]
    }

    movePointer(el, pos, value) {
        this.view.movePointer(el, pos, value)
    }

    getPercentage(pos) {
        return pos / this.view.sliderEdge
    }

    getNearestStep(pos) {
        let minMaxLength = Math.abs(this.model.min - this.model.max)
        let stepsCount = minMaxLength / this.model.step
        return Math.ceil(stepsCount * pos)
    }

    getPosition(nearestStep) {
        let minMaxLength = Math.abs(this.model.min - this.model.max)
        let stepsCount = minMaxLength / this.model.step
        return nearestStep / stepsCount * this.view.sliderEdge
    }

    getValue(nearestStep) {
        console.log(nearestStep)
        return nearestStep * this.model.step + this.model.min
    }

    convertPixelsToValue(px) {
        const pxFraction = px / this.view.sliderEdge
        return Math.round(Math.abs(this.model.min - this.model.max) * pxFraction + this.model.min)
    }

    convertValueToPixels(val: number) {
        if (typeof val !== 'number') {
            val = parseInt(val)
        }
        let pos = val + (this.model.min * -1)
        return pos / Math.abs(this.model.min - this.model.max) * this.view.sliderEdge
    }

    closetsPointer = (curr) => {
        return this.pointers.reduce((previousValue, currentValue) => {
            if (this.model.vertical) {
                if (currentValue) {
                    return Math.abs(parseInt(currentValue.style.bottom) - curr) < Math.abs(parseInt(previousValue.style.bottom) - curr) ?
                        currentValue : previousValue
                } else {
                    return this.pointers[0]
                }
            } else {
                if (currentValue) {
                    return Math.abs(parseInt(currentValue.style.left) - curr) < Math.abs(parseInt(previousValue.style.left) - curr) ?
                        currentValue : previousValue
                } else {
                    return this.pointers[0]
                }
            }
        })
    }

    setDefaultValues() {
        this.view.slider.ready(() => {
            if (this.model.interval) {
                this.movePointer(this.view.pointer[0], this.convertValueToPixels(this.model.from), this.model.from)
                this.movePointer(this.view.pointer[1], this.convertValueToPixels(this.model.to), this.model.to)
            } else {
                this.movePointer(this.view.pointer[0], this.convertValueToPixels(this.model.from), this.model.from)
            }
        })

    }

    handleScaleClicks() {
        console.log(this.view.scaleValue)
        $.each(this.view.scaleValue, (i, value) => {
            value.addEventListener('pointerdown', () => {
                let pos = this.convertValueToPixels(value.innerHTML)
                console.log(pos)
                this.movePointer(this.closetsPointer(pos), pos, value.innerHTML)
            })
        })

    }

    handlePointerEvent = () => {
        this.view.slider[0].onpointerdown = (e) => {
            e.preventDefault()
            let currentPointer = this.view.pointer[0];
            let minMaxLength = Math.abs(this.model.min - this.model.min)
            if (e.target.classList.contains("range-slider") || e.target.classList.contains("range-slider-progress")) {
                let curr = (e.clientX - this.view.slider[0].getBoundingClientRect().left - this.view.pointer[0].offsetWidth * 0.5)
                console.log(this.model.max - this.model.min, minMaxLength)
                this.movePointer(this.closetsPointer(curr), curr, Math.round(Math.abs(this.model.min - this.model.max) * (curr / this.view.sliderEdge) + this.model.min))
            }
            if (e.target.classList.contains("range-slider_vertical") || e.target.classList.contains("range-slider-progress_vertical")) {
                let curr = (this.view.slider[0].getBoundingClientRect().bottom - e.clientY - this.view.pointer[0].offsetWidth * 0.5)
                this.view.movePointer(this.closetsPointer(curr), curr, this.getPercentage(curr))
            }
            if (e.target.classList.contains("range-slider-pointer")) {
                currentPointer = e.target

            }

            const onPointerMove = (e) => {
                let sliderThumbX, sliderLen

                if (this.model.vertical) {
                    sliderThumbX = this.view.slider[0].offsetHeight - e.clientY + this.view.slider[0].getBoundingClientRect().top

                } else {
                    sliderThumbX = e.clientX - this.view.slider[0].getBoundingClientRect().left - this.view.pointer[0].offsetWidth * 0.5
                }
                let thumbPosition = pointerKeeper(sliderThumbX / this.view.sliderEdge, 0, 1)
                let nearestStep = this.getNearestStep(thumbPosition)
                let value = this.getValue(nearestStep)
                let position = this.getPosition(nearestStep)

                if (this.model.interval) {
                    if (currentPointer === this.pointers[0]) {
                        let rightEdge
                        if (this.model.vertical) {
                            rightEdge = parseInt(this.pointers[1].style.bottom) - this.pointers[1].offsetHeight
                        } else {
                            rightEdge = parseInt(this.pointers[1].style.left) - this.pointers[1].offsetWidth
                        }
                        this.view.movePointer(currentPointer, pointerKeeper(position, 0, rightEdge), value)
                    }
                    if (currentPointer === this.pointers[1]) {
                        let leftEdge
                        if (this.model.vertical) {
                            leftEdge = parseInt(this.pointers[0].style.bottom) + this.pointers[0].offsetHeight - 0.5
                        } else {
                            leftEdge = parseInt(this.pointers[0].style.left) + this.pointers[0].offsetWidth - 0.5
                        }
                        this.view.movePointer(currentPointer, pointerKeeper(position, leftEdge), value)
                    }
                } else {
                    console.log(currentPointer, pointerKeeper(position), pointerKeeper(value, this.model.min, this.model.max))
                    this.view.movePointer(currentPointer, pointerKeeper(position), pointerKeeper(value, this.model.min, this.model.max))
                }
            }

            const onPointerUp = () => {
                document.removeEventListener('pointermove', onPointerMove)
                document.removeEventListener('pointerup', onPointerUp)
            }
            document.addEventListener('pointermove', onPointerMove)
            document.addEventListener('pointerup', onPointerUp)


            const pointerKeeper = (pos: number, min: number = 0, max: number = this.view.sliderEdge) => {
                if (pos < min) {
                    return min
                }
                if (pos > max) {
                    return max
                }
                return pos
            }
        }
    }
}
