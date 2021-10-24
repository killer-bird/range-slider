import './scss/index.scss'
import App from "./ts/App";



(function ($) {

    $.fn.rangeSlider = function (options?) {
        const slider = new App(options)
    }

}(jQuery));

$('div').rangeSlider( )



