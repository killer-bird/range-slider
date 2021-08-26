import {MakeObserverSubject} from "./sliderObserver";

export class SliderModel {

    constructor(
                private step?: number,
                private vertical?: boolean,
                private colorBar?: string,
                private colorThumb?: string,
                private range?: number[]) {

        this.step = step || 1
        this.vertical = vertical || false
        this.colorBar = colorBar || '#32a85c'
        this.colorThumb = colorThumb || '#5032a8'
        this.range = range || [1, 100]
    }

    changed = MakeObserverSubject();
    setStep(step: number): void {
        this.step = step;
        this.changed.notifyObservers(this.step)
    }

    setColorBar(color:string):void{
        this.colorBar = color;
        this.changed.notifyObservers(color)
        console.log(color)
    }
    setColorThumb(color:string):void{
        this.colorThumb = color;
        this.changed.notifyObservers(color)
    }

    getModel() {
        return {
            step: this.step,
            vertical: this.vertical,
            colorBar: this.colorBar,
            colorThumb: this.colorThumb,
            range: this.range
        }
    }
}