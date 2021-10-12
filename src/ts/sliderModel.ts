export class SliderModel{

    public step:number
    public min :number
    public max:number
    public from :number
    public to :number

    constructor(public options:object) {
        this.step = options['step']
        this.min = options['min']
        this.max = options['max']
        this.from = options['values'][0]
        this.to = options['values'][1]

    }




    public setOptions(options:object){
        this.options = {...this.options, ...options}
    }

    setStep(step: number): void {
        this.step = step;
    }
    setPosition(position: string): void {

    }

    setFrom(from:number):void{
        this.from = from
    }
    setTo(to:number):void{
        this.to = to
    }
    setMin(min:number):void{
        this.min = min
    }
    setMax(max:number):void{
        this.max = max
    }
    setColorBar(color: string): void {
        this.colorBar = color;
        this.changed.notifyObservers((o) => {
            o.progressBar.css('background', this.getModel().colorBar)
        })
    }
    setColorThumb(color: string): void {
        this.colorThumb = color;
        this.changed.notifyObservers((o) => {
            o.thumb.css('background', this.getModel().colorThumb)
        })
    }
    getOptions(){
        return this.options
    }

    getModel() {
        return {
            step: this.step,
            position: this.position,
            colorBar: this.colorBar,
            colorThumb: this.colorThumb,
            start: this.start,
            from: this.from,
            to: this.to,
            min: this.min,
            max: this.max

        }
    }
}