import {MakeObserverSubject} from "./sliderObserver";

export function SliderView(model, rootEl) {



    this.slider = $('<div class="range-slider"><div/>').appendTo(rootEl)
    this.thumb = $('<div class="range-slider-thumb"><div/>').appendTo(this.slider)
    this.progressBar = $('<div class="range-slider-progress"><div/>').appendTo(this.slider)
    this.scale = $('<div class="range-slider-scale"><div/>').appendTo(this.slider)
    model.changed.addObserver(this)

   this.subscribe = ()=>{
        let options = model.getModel()
        this.progressBar.css('background',options.colorBar)
        this.thumb.css('background', options.colorThumb)
    }




}