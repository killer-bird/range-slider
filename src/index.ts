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
const rangeSlider: HTMLElement  = document.querySelector('.range-slider')
const progressBar: HTMLElement = document.querySelector('.progress')
const scale:HTMLElement = document.querySelector('scale')
const box = rangeSlider.getBoundingClientRect()

let step :number= 1;
let min :number= 1;
let max :number= 1000;
let values = [];
let stepCount:number = (max - min)/step

let stepSize = (rangeSlider.offsetWidth - mark.offsetWidth)/stepCount

mark.onmousedown = function (event) {
    event.preventDefault();
    let shiftX = event.clientX - mark.getBoundingClientRect().left
    document.addEventListener('mousemove', onMouseMove);
    function onMouseMove(event){
        let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
        let left = max - min/ step
        if (newLeft < 0){
            newLeft = 0;
        }
        let rightEdge = rangeSlider.offsetWidth - mark.offsetWidth
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        mark.style.left = newLeft + 'px';
        mark.innerHTML = Math.round(max*(newLeft / rightEdge * 100/100)) +''
        progressBar.style.width = Math.round(newLeft/rightEdge*100) + '%'
        mark.style.color = 'white'
        mark.style.textAlign = 'center'
    }
    document.addEventListener('mouseup', ()=>{
        document.removeEventListener('mousemove',onMouseMove)
    })
}
