import './scss/index.scss'
import App from "./ts/App";



(function ($) {

    $.fn.rangeSlider = function () {
        const slider = new App()
        slider.init()
    }

}(jQuery));

$('div').rangeSlider()

