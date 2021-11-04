export default class View {
    public slider
    public sliderValue
    public pointer
    public progressBar
    public scale
    public scaleValue
    public sliderEdge

    constructor(public model, public root: JQuery) {}

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

            this.sliderValue = $('.range-slider-value')
        } else {
            this.pointer = $('<div class="range-slider-pointer"><div/>').appendTo(this.slider)
            this.pointer.css('background', this.model.colorThumb)
        }
        $.each(this.pointer, (i, pointer)=>{
            $('<div class="range-slider-value"><div/>').appendTo(pointer)
        })


        this.progressBar.css('background', this.model.colorBar)
        if (this.model.scale) {
            this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
            this.renderScale()
            this.scaleValue = $('.scale-value')
        }

        this.slider.ready(() => {
            if (this.model.vertical) {
                this.sliderEdge = this.slider[0].offsetHeight - this.pointer[0].offsetHeight
            } else {
                this.sliderEdge = this.slider[0].offsetWidth - this.pointer[0].offsetWidth
            }
        })

    }

    renderScale() {
        let tmp = 0;
        let count = 4;
        let step = Math.abs(this.model.max - this.model.min) / count
        if (this.model.vertical) {
            for (let i = this.model.max; i >= this.model.min; i -= step) {
                console.log(i)
                console.log(this.model.min, this.model.max)
                $('<div class="scale-value"><div/>').appendTo(this.scale).html(i).css('position', 'absolute').css('top', tmp + "%")
                tmp += 25;
            }
        } else {
            for (let i = this.model.min; i <= this.model.max; i += step) {
                console.log(i)
                console.log(this.model.min, this.model.max)
                $('<div class="scale-value"><div/>').appendTo(this.scale).html(Math.round(i)).css('position', 'absolute').css('left', tmp + "%")
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

    movePointer(el, position: number, value:number) {
        console.log(el,position, value)
        if (this.model.vertical) {
            el.style.bottom = position + 'px';
            if (this.model.interval) {
                this.progressBar[0].style.bottom = this.pointer[0].style.bottom
                let lenOfInterval = parseInt(this.pointer[1].style.bottom) - parseInt(this.pointer[0].style.bottom)
                this.progressBar[0].style.height = lenOfInterval / this.sliderEdge * 100 + "%"
            } else {
                el.style.bottom = position + 'px';
                this.progressBar[0].style.height = this.getPercentage(position) + '%'
            }

        } else {
            el.style.left = position + 'px';
            if (this.model.interval) {
                this.progressBar[0].style.left = this.pointer[0].style.left
                let lenOfInterval = parseInt(this.pointer[1].style.left) - parseInt(this.pointer[0].style.left)
                this.progressBar[0].style.width = lenOfInterval / this.sliderEdge * 100 + "%"
            } else {
                this.progressBar[0].style.width = position + 2 + 'px'
            }
        }
        console.log(el.children)
        el.children[1].innerText = value
    }
}