export function SliderView(model, rootEl) {
    model.changed.addObserver(this)
    this.slider = $('<div class="range-slider"><div/>').appendTo(rootEl)
    this.thumb = $('<div class="range-slider-thumb"><div/>').appendTo(this.slider)
    this.thumb.css('color', "white")
    this.thumb.css('textAlign', 'center')
    this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
    this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)

    for (let i = 0; i <= 20; i++) {
        if (i === 0 || i % 5 === 0) {
            this.scaleValue = $('<div class="range-slider-scale-item_text"><div/>').appendTo(this.scale)
        } else {
            this.scaleValue = $('<div class="range-slider-scale-item_small"><div/>').appendTo(this.scale)
        }
    }
    let textValue: NodeListOf<HTMLElement> = document.querySelectorAll('.range-slider-scale-item_text')
    let counter = 0;
    this.renderScale = ()=>{
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

}