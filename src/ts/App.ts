import SliderModel from "./sliderModel";
import {defaultSettings} from "./defaultModel";
import Observer from "./sliderObserver";
import View from "./view";
import Controller from "./interface";


const pointer: HTMLElement = document.querySelector('.range-slider-pointer')
const rangeSlider: HTMLElement = document.querySelector('.range-slider');

const verticalInput: HTMLInputElement = document.querySelector('.vertical');
const scaleInput:HTMLInputElement = document.querySelector('.scale')
const progressInput: HTMLInputElement = document.querySelector('.colorBar')
const pointerInput: HTMLInputElement = document.querySelector('.colorThumb')
const stepInput: HTMLInputElement = document.querySelector('.step')
const minInput: HTMLInputElement = document.querySelector('.min')
const maxInput: HTMLInputElement = document.querySelector('.max')
const fromInput: HTMLInputElement = document.querySelector('.from')
const toInput: HTMLInputElement = document.querySelector('.to')
const intervalInput:HTMLInputElement = document.querySelector('.interval')

export default class App {
    public options: object
    constructor(options?) {
        this.options = options
        this.init()
    }


    init() {
        const model = new SliderModel({...defaultSettings, ...this.options})
        const container = document.createElement('div')
        container.className = "slider-container"
        document.body.append(container)
        const newView = new View(model, $('<div class="slider-container"><div/>').appendTo($("body")))
        const controller = new Controller(model, newView)
        const observer = new Observer(model, controller)

        progressInput.addEventListener('change', () => {
            observer.proxyModel.colorBar = progressInput.value
        })
        pointerInput.addEventListener('change', () => {
            observer.proxyModel.colorThumb = pointerInput.value
        })
        verticalInput.addEventListener('change', () => {
            observer.proxyModel.vertical = (verticalInput.value === 'true')
        })
        scaleInput.addEventListener('change',()=>{
            observer.proxyModel.scale = (scaleInput.value === 'true')
        })
        stepInput.addEventListener('change', () => {
            observer.proxyModel.step = stepInput.value
            fromInput.step = stepInput.value

        })
        minInput.addEventListener('change', () => {
            observer.proxyModel.min = minInput.value
        })
        maxInput.addEventListener('change', () => {
            observer.proxyModel.max = maxInput.value
        })
        fromInput.addEventListener('input', () => {
            observer.proxyModel.from = fromInput.value
        })
        toInput.addEventListener('input', ()=>{
            observer.proxyModel.to = toInput.value
        })
        intervalInput.addEventListener('input', ()=>{
            observer.proxyModel.interval = (intervalInput.value === 'true')
        })

    }
}