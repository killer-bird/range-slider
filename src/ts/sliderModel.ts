import {ModelOptions} from "./interfases";

export default class SliderModel implements ModelOptions {

    public step
    public min
    public max
    public vertical
    public from
    public to
    public colorBar
    public colorThumb
    public scale
    public interval


    constructor(public options?: object) {
        this.step = options['step']
        this.min = options['min']
        this.max = options['max']
        this.from = options['from']
        this.to = options['to']
        this.vertical = options['vertical']
        this.colorBar = options['colorBar']
        this.colorThumb = options['colorThumb']
        this.scale = options['scale']
        this.interval = options['interval']

    }

    setStep(step) {
        this.step = step
    }

    setMin(min) {
        this.min = min
    }

    setMax(max) {
        this.max = max
    }

    setColorBar(color) {
        this.colorBar = color
    }

    setColorPointer(color) {
        this.colorThumb = color
    }

    setVertical(value) {
        this.vertical = value
    }

    setScale(value) {
        this.scale = value
    }

    setFrom(from) {
        this.from = from
    }

    setTo(to) {
        this.to = to
    }

    setInterval(interval) {
        this.interval = interval
    }
}