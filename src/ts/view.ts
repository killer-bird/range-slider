import {MakeObserverSubject} from "./sliderObserver";

export function SliderView(model, rootEl) {

    this.slider = $('<div class="range-slider"><div/>').appendTo(rootEl)
    this.thumb = $('<div class="range-slider-thumb"><div/>').appendTo(this.slider)
    this.thumb.css('color', "white")
    this.thumb.css('textAlign', 'center')
    this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
    this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
    model.changed.addObserver(this)



   this.subscribe = (func)=>{
        func(this)
    }




}