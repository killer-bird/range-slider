export default  class View {
    public slider
    public pointer
    public progressBar
    public sliderEdge
    public scale

    constructor(public root, public model)  {

    }
    renderSlider = ()=> {
        const createPointer = (parent) => {
            const pointer = '<div class="slider-pointer"></div>'
            const label = '<div class="slider-label"></div>'
            if (this.model.options.interval) {
                for (let i = 0; i < 2; i++) {
                    parent.insertAdjacentHTML('beforeend', pointer)
                }
                this.pointer = parent.querySelectorAll('.slider-pointer')
                this.pointer.forEach((i) => {
                    i.insertAdjacentHTML('beforeend', label)
                })
            } else {
                parent.insertAdjacentHTML('beforeend', pointer)
                this.pointer = this.slider.querySelector('.slider-pointer')
                this.pointer.insertAdjacentHTML('beforeend', label)
                if (this.model.vertical) {
                    this.pointer.style.right = -8 + 'px'
                }
            }
        }
        this.root.insertAdjacentHTML('beforeend', '<div class="slider"></div>')
        this.slider = this.root.querySelector('.slider')
        createPointer(this.slider)
        this.slider.insertAdjacentHTML('beforeend', '<div class="range-slider-progress"></div>')
        this.progressBar = this.slider.querySelector('.range-slider-progress')

        if (this.model.vertical) {
            this.slider.style.height = 300 + 'px'
            this.slider.style.width = 8 + 'px'
            this.progressBar.style.height = 0
            this.progressBar.style.width = 100 + '%'
            this.sliderEdge = this.slider.offsetHeight - this.slider.firstChild.offsetHeight

        } else {
            this.slider.style.width = 300 + "px"
            this.slider.style.height = 8 + "px"
            this.progressBar.style.width = 0
            this.progressBar.style.height = 100 + "%"
        }
        this.renderScale()
        this.sliderEdge = this.slider.offsetWidth
    }

    renderScale() {
        if (this.model.scale) {
            let tmp = 0
            this.slider.insertAdjacentHTML('beforeend', '<div class="slider-scale"></div>')
            this.scale = this.slider.querySelector('.slider-scale')
            let step = Math.abs(this.model.max - this.model.min) / 4
            for (let i = this.model.min; i <= this.model.max; i += step) {
                this.scale.insertAdjacentHTML('beforeend',`<div class="scale-value" style="left: ${tmp}%">${i}</div>`)
                tmp+=25
            }
        }
    }
    movePointer(el, position: number, value) {


        el.firstChild.innerHTML = value

        if (this.model.vertical) {
            el.style.bottom = position + 'px';
            if (this.model.interval) {
                this.progressBar.style.bottom = this.pointer[0].style.bottom
                let lenOfInterval = parseInt(this.pointer[1].style.bottom) - parseInt(this.pointer[0].style.bottom)
                this.progressBar.style.height = lenOfInterval / this.sliderEdge * 100 + "%"
            } else {
                el.style.bottom = position + 'px';
                this.progressBar.style.height = position / this.sliderEdge * 100 + '%'
            }

        } else {
            el.style.left = position + 'px';
            if (this.model.interval) {
                this.progressBar.style.left = this.pointer[0].style.left
                let lenOfInterval = parseInt(this.pointer[1].style.left) - parseInt(this.pointer[0].style.left)
                this.progressBar.style.width = lenOfInterval + "px"
            } else {
                this.progressBar.style.width = position / this.sliderEdge * 100 + '%'
            }
        }
    }
}





// export default class View {
//     public root
//     public slider
//     public label
//     public pointer
//     public progressBar
//     public scale
//     public scaleValue
//     public sliderEdge
//
//
//     constructor(public model, root: JQuery) {
//         this.root = root[0]
//     }
//
//     getPercentage(pos) {
//         return pos / this.sliderEdge * 100
//     }
//
//     renderSlider = ()=> {
//         const createPointer = (parent) => {
//             const pointer = '<div class="slider-pointer"></div>'
//             const label = '<div class="slider-label"></div>'
//             if (this.model.interval) {
//                 for (let i = 0; i < 2; i++) {
//                     parent.insertAdjacentHTML('beforeend', pointer)
//                 }
//                 this.pointer = parent.querySelectorAll('.slider-pointer')
//                 this.pointer.forEach((i) => {
//                     i.insertAdjacentHTML('beforeend', label)
//                 })
//             } else {
//                 parent.insertAdjacentHTML('beforeend', pointer)
//                 this.pointer = this.slider.querySelector('.slider-pointer')
//                 this.pointer.insertAdjacentHTML('beforeend', label)
//                 if (this.model.vertical) {
//                     this.pointer.style.right = -8 + 'px'
//                 }
//             }
//             // document.addEventListener('readystatechange', ()=>{
//             //     this.sliderEdge = this.slider.offsetWidth - this.pointer.offsetWidth
//             //     console.log(this.sliderEdge, this)
//             // })
//
//         }
//         this.root.insertAdjacentHTML('beforeend', '<div class="slider"></div>')
//         this.slider = this.root.querySelector('.slider')
//         createPointer(this.slider)
//         this.slider.insertAdjacentHTML('beforeend', '<div class="range-slider-progress"></div>')
//         this.progressBar = this.slider.querySelector('.range-slider-progress')
//
//         if (this.model.vertical) {
//             this.slider.style.height = 300 + 'px'
//             this.slider.style.width = 8 + 'px'
//             this.progressBar.style.height = 0
//             this.progressBar.style.width = 100 + '%'
//             this.sliderEdge = this.slider.offsetHeight - this.slider.firstChild.offsetHeight
//
//         } else {
//             this.slider.style.width = 300 + "px"
//             this.slider.style.height = 8 + "px"
//             this.progressBar.style.width = 0
//             this.progressBar.style.height = 100 + "%"
//         }
//         this.renderScale()
//         this.sliderEdge = this.slider.offsetWidth
//     }
//
//     renderScale() {
//         if (this.model.scale) {
//             let tmp = 0
//             this.slider.insertAdjacentHTML('beforeend', '<div class="slider-scale"></div>')
//             this.scale = this.slider.querySelector('.slider-scale')
//             let step = Math.abs(this.model.max - this.model.min) / 4
//             for (let i = this.model.min; i <= this.model.max; i += step) {
//                 this.scale.insertAdjacentHTML('beforeend',`<div class="scale-value" style="left: ${tmp}%">${i}</div>`)
//                 tmp+=25
//             }
//         }
//     }
//
//     // renderSlider() {
//     //     console.log(this.root[0])
//     //
//     //     if(!this.root.hasClass("slider-container")){
//     //         console.log(1234)
//     //         this.root = null
//     //     }
//     //
//     //     if (this.model.vertical) {
//     //         this.slider = $('<div class="range-slider_vertical"><div/>').appendTo(this.root)
//     //         this.progressBar = $('<div class="range-slider-progress_vertical"><div/>').appendTo(this.slider)
//     //     } else {
//     //         this.slider = $('<div class="range-slider"><div/>').appendTo(this.root)
//     //         this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
//     //     }
//     //     if (this.model.interval) {
//     //         this.pointer = $('<div class="range-slider-pointer"><div/>')
//     //             .add($('<div class="range-slider-pointer"><div/>'))
//     //             .css('background', this.model.colorThumb).appendTo(this.slider)
//     //
//     //         this.sliderValue = $('.range-slider-label')
//     //     } else {
//     //         this.pointer = $('<div class="range-slider-pointer"><div/>').appendTo(this.slider)
//     //         this.pointer.css('background', this.model.colorThumb)
//     //     }
//     //     $.each(this.pointer, (i, pointer)=>{
//     //         $('<div class="range-slider-label"><div/>').appendTo(pointer)
//     //     })
//     //
//     //
//     //     this.progressBar.css('background', this.model.colorBar)
//     //     if (this.model.scale) {
//     //         this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
//     //
//     //         this.scaleValue = $('.scale-value')
//     //     }
//     //
//     //     this.slider.ready(() => {
//     //         if (this.model.vertical) {
//     //             this.sliderEdge = this.slider[0].offsetHeight - this.pointer[0].offsetHeight
//     //         } else {
//     //             this.sliderEdge = this.slider[0].offsetWidth - this.pointer[0].offsetWidth
//     //         }
//     //         this.renderScale()
//     //     })
//     //
//     // }
//
//     // renderScale() {
//     //     let tmp = 0;
//     //     let count = 4;
//     //     let step = Math.abs(this.model.max - this.model.min) / count
//     //     console.log(step)
//     //
//     //     if (this.model.vertical) {
//     //         for (let i = this.model.max; i >= this.model.min; i -= step) {
//     //             console.log(i)
//     //             console.log(this.model.min, this.model.max)
//     //             $('<div class="scale-value"><div/>').appendTo(this.scale).html(i).css('position', 'absolute').css('top', tmp + "%")
//     //             tmp += 25;
//     //         }
//     //     } else {
//     //         for (let i = this.model.min; i <= this.model.max; i += step) {
//     //             console.log(i)
//     //             console.log(this.model.min, this.model.max)
//     //             $('<div class="scale-value"><div/>').appendTo(this.scale).css('position', 'absolute').css('left', tmp + "%").html(Math.round(i))
//     //             tmp += 25;
//     //         }
//     //     }
//     // }
//
//     removeSlider() {
//         this.slider.remove()
//     }
//
//     updateSlider() {
//         this.removeSlider()
//         this.renderSlider()
//     }
//
//     movePointer(el, position: number, value) {
//
//         el.firstChild.innerHTML = value
//
//         if (this.model.vertical) {
//             el.style.bottom = position + 'px';
//             if (this.model.interval) {
//                 this.progressBar.style.bottom = this.pointer[0].style.bottom
//                 let lenOfInterval = parseInt(this.pointer[1].style.bottom) - parseInt(this.pointer[0].style.bottom)
//                 this.progressBar.style.height = lenOfInterval / this.sliderEdge * 100 + "%"
//             } else {
//                 el.style.bottom = position + 'px';
//                 this.progressBar.style.height = this.getPercentage(position) + '%'
//             }
//
//         } else {
//             el.style.left = position + 'px';
//             if (this.model.interval) {
//                 this.progressBar.style.left = this.pointer[0].style.left
//                 let lenOfInterval = parseInt(this.pointer[1].style.left) - parseInt(this.pointer[0].style.left)
//                 this.progressBar.style.width = lenOfInterval + "px"
//             } else {
//                 this.progressBar.style.width = position / this.sliderEdge * 100 + '%'
//             }
//         }
//     }
// }