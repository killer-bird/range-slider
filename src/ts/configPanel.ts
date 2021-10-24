import Observer from "./sliderObserver";
import Controller from "./interface";
import SliderModel from "./sliderModel";

const thumbFrom: HTMLElement = document.querySelector('.range-slider-thumb-lower')
const thumbTo :HTMLElement = document.querySelector('.range-slider-thumb-upper')
const rangeSlider: HTMLElement = document.querySelector('.range-slider');


const progressInput: HTMLInputElement = document.querySelector('.colorBar')
const progressThumb: HTMLInputElement = document.querySelector('.colorThumb')
const stepInput: HTMLInputElement = document.querySelector('.step')
const minInput: HTMLInputElement = document.querySelector('.min')
const maxInput: HTMLInputElement = document.querySelector('.max')
const fromInput: HTMLInputElement = document.querySelector('.from')


