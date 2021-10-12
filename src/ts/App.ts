import {SliderModel} from "./sliderModel";
import {SliderView} from "./view";
import {SliderController} from "./interface";
import {defaultSettings} from "./defaultModel";
import Observer from "./sliderObserver";
import View from "./view";
import Controller from "./interface";

export default class App {
    public options: object
    observer = new Observer()
    init() {
        const model = new SliderModel(this.options||defaultSettings)
        const container = document.createElement('div')
        container.className = "slider-container"
        document.body.append(container)
        const newView = new View(model, $('<div class="slider-container"><div/>').appendTo($("body")))
        const controller = new Controller(model, newView)
        console.log(newView)
    }
}