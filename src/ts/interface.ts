export default class Controller {
    public model
    public view
    public sliderEdge: number
    public slider

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
        this.handlePointerEvent()
    }

    renderView() {
        this.view.renderSlider()
        this.handlePointerEvent()
    }

    convertValToPx(val) {
        return this.view.sliderEdge * (val / (this.model.max - this.model.min) * 100) / 100 - this.model.min
    }

    movePointer(el, pos, perc) {
        this.view.movePointer(el, pos, perc)
    }

    getPercentage(pos) {
        return pos / this.view.sliderEdge * 100
    }

    handlePointerEvent = () => {
        this.view.slider[0].onpointerdown = (e) => {
            e.preventDefault()
            let shiftX = e.offsetX
            let shiftY = e.offsetY
            const pointers = [this.view.pointer[0], this.view.pointer[1]]
            const closetsPointer = (curr) => {
                return pointers.reduce((previousValue, currentValue) => {
                    if(this.model.vertical){
                        if (currentValue) {
                            return Math.abs(parseInt(currentValue.style.bottom) - curr) < Math.abs(parseInt(previousValue.style.bottom) - curr) ?
                                currentValue : previousValue
                        } else {
                            return pointers[0]
                        }
                    }else {
                        if (currentValue) {
                            return Math.abs(parseInt(currentValue.style.left) - curr) < Math.abs(parseInt(previousValue.style.left) - curr) ?
                                currentValue : previousValue
                        } else {
                            return pointers[0]
                        }
                    }
                })
            }

            if (e.target.classList.contains("range-slider") || e.target.classList.contains("range-slider-progress")) {
                let curr = (e.clientX - this.view.slider[0].getBoundingClientRect().left - this.view.pointer[0].offsetWidth * 0.5)
                this.view.movePointer(closetsPointer(curr), curr, this.getPercentage(curr))
            }
            if (e.target.classList.contains("range-slider_vertical") || e.target.classList.contains("range-slider-progress_vertical")) {
                console.log(this.view.slider[0].getBoundingClientRect().bottom - e.clientY)
                let curr = (this.view.slider[0].getBoundingClientRect().bottom - e.clientY - this.view.pointer[0].offsetWidth * 0.5)
                this.view.movePointer(closetsPointer(curr), curr, this.getPercentage(curr))
            }

            if (e.target.classList.contains("range-slider-pointer")) {
                const onPointerMove = (e) => {
                    if (e.target.classList.contains("range-slider-pointer")) {
                        let {step, min, max} = this.model
                        let newLeft,
                            stepDiv,
                            thumbWidth,
                            position

                        if (this.model.vertical) {
                            newLeft = this.view.slider[0].offsetHeight - e.clientY - shiftY + this.view.slider[0].getBoundingClientRect().top
                        } else {
                            newLeft = e.clientX - shiftX - this.view.slider[0].getBoundingClientRect().left
                        }
                        stepDiv = Math.round((max * newLeft / this.view.sliderEdge) / step)

                        thumbWidth = (stepDiv * step)
                        position = thumbWidth / max * this.view.sliderEdge

                        if(this.model.interval){
                            if (this.model.vertical){
                                if(e.target === pointers[0]){
                                    this.movePointer(e.target, pointerKeeper(position, 0, parseInt(pointers[1].style.bottom) - pointers[1].offsetHeight ), this.view.getPercentage(position))
                                }else {
                                    console.log(parseInt(pointers[0].style.bottom) - pointers[0].offsetHeight)
                                    this.movePointer(e.target, pointerKeeper(position, parseInt(pointers[0].style.bottom) + pointers[0].offsetHeight, ), this.view.getPercentage(position))
                                }
                            }else {
                                if(e.target === pointers[0]){
                                    this.movePointer(e.target, pointerKeeper(position, 0, parseInt(pointers[1].style.left) - pointers[1].offsetWidth ), this.view.getPercentage(position))
                                }else {
                                    console.log(parseInt(pointers[0].style.left) - pointers[0].offsetWidth)
                                    this.movePointer(e.target, pointerKeeper(position, parseInt(pointers[0].style.left) + pointers[0].offsetWidth, ), this.view.getPercentage(position))
                                }
                            }

                        }else {
                            this.movePointer(e.target, pointerKeeper(position), this.view.getPercentage(position))
                        }
                    }
                }

                const onPointerUp = () => {
                    document.removeEventListener('pointermove', onPointerMove)
                    document.removeEventListener('pointerup', onPointerUp)
                }
                document.addEventListener('pointermove', onPointerMove)
                document.addEventListener('pointerup', onPointerUp)
            }

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


// export function SliderController(model, view) {
//     $('body').ready( () => {
//         let {min, max} = model.getModel()
//         const thumbFrom: HTMLElement = document.querySelector('.range-slider-thumb-lower')
//         const thumbTo :HTMLElement = document.querySelector('.range-slider-thumb-upper')
//
//         const rangeSlider: HTMLElement = document.querySelector('.range-slider')!;
//
//         const progressInput: HTMLInputElement = document.querySelector('.colorBar')
//         const progressThumb: HTMLInputElement = document.querySelector('.colorThumb')
//         const stepInput: HTMLInputElement = document.querySelector('.step')
//         const minInput: HTMLInputElement = document.querySelector('.min')
//         const maxInput: HTMLInputElement = document.querySelector('.max')
//         const fromInput: HTMLInputElement = document.querySelector('.from')
//         let endSlider = rangeSlider.offsetWidth - thumbFrom.offsetWidth
//
//
//         progressInput.addEventListener('input', () => {
//             model.setColorBar(progressInput.value)
//         })
//         progressThumb.addEventListener('input', () => {
//             model.setColorThumb(progressThumb.value)
//         })
//         stepInput.addEventListener('input', () => {
//             model.setStep(+stepInput.value)
//             fromInput.setAttribute("step", stepInput.value)
//         })
//         minInput.addEventListener('change', () => {
//             model.setMin(+minInput.value)
//             view.renderScale()
//         })
//         maxInput.addEventListener('change', () => {
//             model.setMax(+maxInput.value)
//             view.renderScale()
//         })
//         fromInput.addEventListener('input', () => {
//             model.setFrom(+fromInput.value)
//             let {from, min, max} = model.getModel()
//             view.changeThumbPosition(view.convertValueToPx(from))
//
//         })
//
//         const defPosition = (shiftX, event)=>{
//             let {step} = model.getModel()
//             let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
//             let stepDiv = Math.round((max * newLeft / endSlider) / step)
//             let thumbWidth = (stepDiv * step)
//             return Math.round(thumbWidth / max * endSlider)
//         }
//
//
//         // thumbFrom.onpointerdown = (event) => {
//         //     event.preventDefault()
//         //     let shiftX = event.clientX - thumbFrom.getBoundingClientRect().left
//         //     document.addEventListener('pointermove', onPointerMove);
//         //     function onPointerMove(event) {
//         //         let position = defPosition(shiftX,event)
//         //         model.setFrom(position)
//         //         view.changeThumbPosition(position, thumbFrom)
//         //     }
//         //     document.addEventListener('pointerup', () => {
//         //         document.removeEventListener('pointermove', onPointerMove)
//         //     })
//         // }
//
//
//         // thumbTo.onpointerdown = (event) => {
//         //     event.preventDefault()
//         //     let shiftX = event.clientX - thumbTo.getBoundingClientRect().left
//         //     document.addEventListener('pointermove', onPointerMove);
//         //     function onPointerMove(event) {
//         //         let position = defPosition(shiftX,event)
//         //         model.setTo(position)
//         //         view.changeThumbPosition(position, thumbTo)
//         //     }
//         //     document.addEventListener('pointerup', () => {
//         //         document.removeEventListener('pointermove', onPointerMove)
//         //     })
//         // }
//     })
//
//
// }
