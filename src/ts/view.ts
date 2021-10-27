export default class View {
    public slider
    public sliderValue
    public pointer
    public progressBar
    public scale
    public sliderEdge

    constructor(public model, public root: JQuery) {
    }

    convertValToPx(val) {
        return this.sliderEdge * (val / (this.model.max - this.model.min) * 100) / 100 - this.model.min
    }

    getPercentage(pos) {
        return pos / this.sliderEdge * 100
    }

    renderSlider() {
        if (this.model.vertical) {
            this.slider = $('<div class="range-slider_vertical"><div/>').appendTo(this.root)
            this.progressBar = $('<div class="range-slider-progress_vertical"><div/>').appendTo(this.slider)
        } else {
            this.slider = $('<div class="range-slider"><div/>').appendTo(this.root)
            this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
        }
        if (this.model.interval) {
            this.pointer = $('<div class="range-slider-pointer"><div/>')
                .add($('<div class="range-slider-pointer"><div/>'))
                .css('background', this.model.colorThumb).appendTo(this.slider)
            console.log(this.pointer[0], 0, this.pointer[1])
        } else {
            this.pointer = $('<div class="range-slider-pointer"><div/>').appendTo(this.slider)

            this.pointer.css('background', this.model.colorThumb)
        }

        this.sliderValue = $('<div class="range-slider-value"><div/>').appendTo(this.slider)

        this.progressBar.css('background', this.model.colorBar)
        if (this.model.scale) {
            this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
            this.renderScale()
        }
        this.slider.ready(() => {

            if (this.model.vertical) {
                this.sliderEdge = this.slider[0].offsetHeight - this.pointer[0].offsetHeight
            } else {
                this.sliderEdge = this.slider[0].offsetWidth - this.pointer[0].offsetWidth
            }
            if (this.model.interval) {
                this.movePointer(this.pointer[0], this.convertValToPx(this.model.from))
                this.movePointer(this.pointer[1], this.convertValToPx(this.model.to))
            } else {
                this.movePointer(this.pointer[0], this.convertValToPx(this.model.from))
            }
        })
    }

    renderScale() {
        let tmp = 0;
        const scaleValue = $('<div class="scale-value"><div/>')
        let count = 4;
        let step = Math.round(Math.abs(this.model.max - this.model.min) / count)
        // for (let i = 0; i < count; i++) {
        //     let min = this.model.min;
        //     console.log(min)
        //     min += step
        // }
        if (this.model.vertical) {
            for (let i = this.model.max; i >= this.model.min; i -= step) {
                $('<div class="scale-value"><div/>').appendTo(this.scale).html(i).css('position', 'absolute').css('top', tmp + "%")
                tmp += 25;
            }
        } else {
            for (let i = this.model.min; i <= this.model.max; i += step) {
                $('<div class="scale-value"><div/>').appendTo(this.scale).html(i).css('position', 'absolute').css('left', tmp + "%")
                tmp += 25;
            }
        }
    }

    removeSlider() {
        this.slider[0].remove()
    }

    updateSlider() {
        this.removeSlider()
        this.renderSlider()
    }

    movePointer(el, position: number) {
        if (this.model.vertical) {
            el.style.bottom = position + 'px';
            this.sliderValue[0].style.bottom = position + 'px';
            if (this.model.interval) {
                this.progressBar[0].style.bottom = this.pointer[0].style.bottom
                let widthOfInterval = parseInt(this.pointer[1].style.bottom) - parseInt(this.pointer[0].style.bottom)
                this.progressBar[0].style.height = widthOfInterval / this.sliderEdge * 100 + "%"
            } else {
                el.style.bottom = position + 'px';
                this.sliderValue[0].style.bottom = position + 'px';
                this.progressBar[0].style.height = this.getPercentage(position) + '%'
            }

        } else {
            el.style.left = position + '%';
            this.sliderValue[0].style.left = position + 'px';
            if (this.model.interval) {
                this.progressBar[0].style.left = this.pointer[0].style.left
                let widthOfInterval = parseInt(this.pointer[1].style.left) - parseInt(this.pointer[0].style.left)
                this.progressBar[0].style.width = widthOfInterval / this.sliderEdge * 100 + "%"

            } else {
                this.progressBar[0].style.width = this.getPercentage(position) + '%'
            }

        }
        this.sliderValue[0].innerText = Math.abs(this.model.min - this.model.max) * Math.round(position / this.sliderEdge * 100) / 100 + this.model.min

    }
}

// export function SliderView(model, container) {
//     this.slider = $('<div class="range-slider"><div/>').appendTo(container)
//     this.thumbFrom = $('<div class="range-slider-thumb-lower"><div/>').appendTo(this.slider)
//     this.thumbTo = $('<div class="range-slider-thumb-upper"><div/>').appendTo(this.slider)
//     let endSlider;
//     this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
//     this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
//
//     this.slider.ready(
//         () => {
//             endSlider = this.slider.outerWidth() - this.thumbFrom.outerWidth()
//             for (let i = 0; i <= 20; i++) {
//                 if (i === 0 || i % 5 === 0) {
//                     this.scaleValue = $('<div class="range-slider-scale-item_text"><div/>').appendTo(this.scale)
//                 } else {
//                     this.scaleValue = $('<div class="range-slider-scale-item_small"><div/>').appendTo(this.scale)
//                 }
//             }
//             let textValue: NodeListOf<HTMLElement> = document.querySelectorAll('.range-slider-scale-item_text')
//             let counter = 0;
//             this.renderScale = () => {
//                 let {min, max} = model.getModel()
//                 console.log()
//
//                 for (let value = min; value <= max; value++) {
//                     if (value === min || (value / (Math.abs(min) + max)) * 100 % 25 === 0) {
//                         textValue[counter].innerText = value
//                         counter++
//                     }
//                 }
//             }
//             this.renderScale()
//             this.subscribe = (func) => {
//                 func(this)
//             }
//             this.changeThumbPosition = (px, el) => {
//                 let {min, max} = model.getModel()
//                 const rangeKeeper = (count: number, min: number = 0, max: number = endSlider) => {
//                     if (count < min) {
//                         return min
//                     }
//                     if (count > max) {
//                         return max
//                     }
//                     return count
//                 }
//
//                 let endSlider = this.slider.outerWidth() - this.thumbFrom.outerWidth()
//                 let position = Math.round(rangeKeeper(px)) / endSlider * 100
//                 el.style.left = position + '%'
//
//
//                 // this.thumbFrom.css('left', position+ "%")
//                 // this.thumbFrom.css('left', rangeKeeper(px) + "px")
//
//                 el.innerHtml = rangeKeeper(Math.round(min + (max - min) * (px / endSlider)), min, max)
//                 let fromPos = this.thumbFrom[0].getBoundingClientRect().left - this.slider[0].getBoundingClientRect().left
//                 let toPos = this.thumbTo[0].getBoundingClientRect().left - this.slider[0].getBoundingClientRect().left
//
//                 this.progressBar.css('width', (toPos - fromPos) / endSlider * 100 + "%")
//                 this.progressBar.css('left', fromPos / endSlider * 100 + '%')
//             }
//             this.convertValueToPx = (value) => {
//                 const {min, max} = model.getModel()
//                 return value * endSlider / (min + max)
//             }
//
//             this.changeThumbPosition(this.convertValueToPx(model.getModel().from), this.thumbFrom[0])
//             this.changeThumbPosition(this.convertValueToPx(model.getModel().to), this.thumbTo[0])
//
//         }
//     )
// }