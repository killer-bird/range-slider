export default class View {
    public slider
    public sliderValue
    public viewState: {} = {}
    public thumbFrom
    public thumbTo
    public progressBar
    public scale
    public sliderEdge

    constructor(public model, public root: JQuery) {
        this.viewState['min'] = model.getOptions().min
        this.viewState['max'] = model.getOptions().max
        this.viewState['scale'] = model.getOptions().scale
        this.viewState['colorBar'] = model.getOptions().colorBar
        this.viewState['colorThumb'] = model.getOptions().colorThumb
        this.viewState['vertical'] = model.getOptions().vertical
        this.viewState['values'] = model.getOptions.values
        this.renderSlider()
        this.slider.ready(()=>{
            this.sliderEdge = this.slider[0].offsetWidth - this.thumbFrom[0].offsetWidth
            console.log(this.sliderEdge)
        })

    }

    renderSlider() {
        this.slider = $('<div class="range-slider"><div/>').appendTo(this.root)
        this.thumbFrom = $('<div class="range-slider-thumb-lower"><div/>').appendTo(this.slider)
        this.sliderValue = $('<div class="range-slider-value"><div/>').appendTo(this.slider)
        // this.thumbTo = $('<div class="range-slider-thumb-upper"><div/>').appendTo(this.slider)
        this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
        if (this.viewState['scale']) {
            this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
            this.renderScale()
        }
    }

    renderScale() {
        let tmp = 0;
        const scaleValue = $('<div class="scale-value"><div/>')
        let count = 4;
        let step = Math.abs(this.viewState['max'] - this.viewState['min'])/count

        for (let i = this.viewState['min']; i <= this.viewState['max']; i+=step) {
            $('<div class="scale-value"><div/>').appendTo(this.scale).html(i).css('position', 'absolute').
            css('left', tmp + "%")
            tmp += 25;
        }
    }
    changeThumbPosition(px, el) {

        const rangeKeeper = (count: number, min: number = 0, max: number = this.sliderEdge  ) => {
            if (count < min) {
                return min
            }
            if (count > max) {

                return max
            }
            return count
        }

        let position = Math.round(rangeKeeper(px))
        console.log(this.sliderEdge)
        el[0].style.left = position + 'px'
        this.progressBar[0].style.width = position  + 'px'
    }
}


export function SliderView(model, container) {
    this.slider = $('<div class="range-slider"><div/>').appendTo(container)
    this.thumbFrom = $('<div class="range-slider-thumb-lower"><div/>').appendTo(this.slider)
    this.thumbTo = $('<div class="range-slider-thumb-upper"><div/>').appendTo(this.slider)
    let endSlider;
    this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
    this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)

    this.slider.ready(
        () => {
            endSlider = this.slider.outerWidth() - this.thumbFrom.outerWidth()
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
            this.changeThumbPosition = (px, el) => {
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
                let position = Math.round(rangeKeeper(px)) / endSlider * 100
                el.style.left = position + '%'


                // this.thumbFrom.css('left', position+ "%")
                // this.thumbFrom.css('left', rangeKeeper(px) + "px")

                el.innerHtml = rangeKeeper(Math.round(min + (max - min) * (px / endSlider)), min, max)
                let fromPos = this.thumbFrom[0].getBoundingClientRect().left - this.slider[0].getBoundingClientRect().left
                let toPos = this.thumbTo[0].getBoundingClientRect().left - this.slider[0].getBoundingClientRect().left

                this.progressBar.css('width', (toPos - fromPos) / endSlider * 100 + "%")
                this.progressBar.css('left', fromPos / endSlider * 100 + '%')
            }
            this.convertValueToPx = (value) => {
                const {min, max} = model.getModel()
                return value * endSlider / (min + max)
            }

            this.changeThumbPosition(this.convertValueToPx(model.getModel().from), this.thumbFrom[0])
            this.changeThumbPosition(this.convertValueToPx(model.getModel().to), this.thumbTo[0])

        }
    )
}