import {MakeObserverSubject} from "./sliderObserver";

export class SliderModel {

    constructor(
        private step?: number,
        private position?:  string,
        private colorBar?: string,
        private colorThumb?: string,
        private range?: number[],
        private from?: number,
        private to?: number,
        private min?: number,
        private max?: number
    ) {
        this.step = step || 1
        this.position = position || "gorizontal"
        this.colorBar = colorBar || '#32a85c'
        this.colorThumb = colorThumb || '#5032a8'
        this.range = range || [1, 100]
        this.min = min || 0
        this.max = max || 100
        this.from = from
        this.to = to
    }
    changed = MakeObserverSubject();
    setStep(step: number): void {
        this.step = step;
        this.changed.notifyObservers(() => {
            console.log(this.step)
        })
    }
    setPosition(position: string): void {
        this.position = position ==="vertical" ? "vertical":"gorizontal"
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

    getModel() {
        return {
            step: this.step,
            position: this.position,
            colorBar: this.colorBar,
            colorThumb: this.colorThumb,
            range: this.range,
            from: this.from,
            to: this.to,
            min: this.min,
            max: this.max

        }
    }
}