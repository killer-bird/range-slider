import './scss/index.scss'
import * as $ from 'jquery'
import {SliderModel} from './ts/sliderModel'
import {SliderView} from "./ts/view";
import{SliderController} from "./ts/interface";


(function ($) {
    let model = new SliderModel
    let view = new SliderView(model, $('<div class="slider-container"><div/>').appendTo($("body")));
    let controller = new SliderController(model,view)


}(jQuery));









