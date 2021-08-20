import './scss/index.scss'
import * as $ from 'jquery'
import Model from './ts/model'


let slider = new Model
slider.setStep(3)
console.log(slider.getModel());


(function ($) {
    $.fn.greenify = function () {

    }
}(jQuery));

$('body').greenify()

const mark: HTMLElement = document.getElementsByClassName('range-slider-mark')[0] as HTMLElement

mark.onmousedown = function (event) {

    moveAt(event.pageX);
    function moveAt(pageX) {
        mark.style.left = pageX - mark.offsetWidth / 2 + 'px';
    }
    function onMouseMove(event) {
        moveAt(event.pageX);
    }
    document.addEventListener('mousemove', onMouseMove);
    mark.onmouseup = function() {
        console.log(124)
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousedown', onMouseMove)
        mark.onmouseup = null;
    };
}
mark.ondragstart = function () {
    return false
}
