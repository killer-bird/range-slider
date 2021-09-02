export  function SliderView(model, rootEl) {

    model.changed.addObserver(this)

    this.slider  = $('<div class="range-slider"><div/>').ready(()=>{}).appendTo(rootEl)
    this.thumbFrom = $('<div class="range-slider-thumb-lower"><div/>').ready(()=>{}).appendTo(this.slider)
    this.thumbFrom.css('left', model.getModel.from)
    this.thumbTo = model.getModel().to ? $('<div class="range-slider-thumb-upper"><div/>').appendTo(this.slider) : null
    let endSlider;
    this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
    this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
    console.log(this.slider.outerWidth() - this.thumbFrom.outerWidth(), "ширина")


    console.log(endSlider)


    console.log(this.slider.outerWidth(),this.thumbFrom.outerWidth() )


    for (let i = 0; i <= 20; i++) {
        if (i === 0 || i % 5 === 0) {
            this.scaleValue = $('<div class="range-slider-scale-item_text"><div/>').appendTo(this.scale)
        } else {
            this.scaleValue = $('<div class="range-slider-scale-item_small"><div/>').appendTo(this.scale)
        }
    }
    let textValue: NodeListOf<HTMLElement> = document.querySelectorAll('.range-slider-scale-item_text')
    let counter = 0;
    this.renderScale = () => {
        let {min, max} = model.getModel()
        console.log()
        let counter = 0;
        for (let value = min; value <= max; value++) {
            if (value === min || (value / (Math.abs(min) + max)) * 100 % 25 === 0) {
                textValue[counter].innerText = value
                counter++
            }
        }
    }

    this.renderScale()
    this.subscribe = (func) => {
        func(this)
    }


    this.changeThumbPosition = (px) => {
        let {min, max} = model.getModel()
        const rangeKeeper = (count: number, min: number = 0, max: number = endSlider) => {
            if (count < min) {
                return min
            }
            if (count > max) {
                return max
            }
            return count
        }
        let endSlider = this.slider.outerWidth() - this.thumbFrom.outerWidth()
        this.thumbFrom.css('left', rangeKeeper(px) + "px")
        this.thumbFrom.html(rangeKeeper(Math.round(min + (max - min) * (px / endSlider)), min, max))
        this.progressBar.css('width', px / endSlider * 100 + "%")
    }

    this.convertValueToPx = (value) =>{
        const {min, max}= model.getModel()
        console.log(min, max, value, endSlider)
        console.log(this.slider.outerWidth(), this.thumbFrom.outerWidth())
        return value*endSlider/(min+max)
    }
    setTimeout(()=>{
        endSlider = this.slider.outerWidth() - this.thumbFrom.outerWidth()
        this.changeThumbPosition(this.convertValueToPx(model.getModel().start[0]) )
        console.log(endSlider)
    },0)

}