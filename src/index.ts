import './scss/index.scss'
import {SliderModel} from './ts/sliderModel'
import {SliderView} from "./ts/view";
import {SliderViewVertical} from "./ts/SliderViewVertical";
import {SliderController} from "./ts/interface";
import{SliderControllerVertical} from "./ts/SliderControllerVertical";

(function ($) {
    const positionInput:HTMLInputElement = document.querySelector('.position')

    let model = new SliderModel()
    // model.setPosition("vertical")
    let options = model.getModel()
    let view = options.position ==="gorizontal"? new SliderView(model, $('<div class="slider-container"><div/>').appendTo($("body"))):
        new SliderViewVertical(model, $('<div class="slider-container"><div/>').appendTo($("body")));
    let controller = options.position ==="gorizontal"?new SliderController(model, view):
        new SliderControllerVertical(model,view)

}(jQuery));









