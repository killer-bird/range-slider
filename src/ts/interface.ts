export default class Controller {
    public model
    public view
    public sliderEdge: number
    public slider

    constructor(model, view) {
        this.model = model
        this.view = view

        this.test()
        // this.handleMouseEvents()
    }
    test = ()=>{
        this.view.slider[0].onpointerdown =  (e)=> {
            e.preventDefault()
            let shiftX = e.offsetX
            let shiftY = e.offsetY
            const pointerKeeper  = (pos:number, min:number=0, max:number=this.view.sliderEdge) =>{
                if (pos<min){
                    return min
                }
                if (pos>max){
                    return max
                }
                return pos
            }
            const onPointerMove = (e) => {
                let {step, min, max} = this.model
                let newLeft,
                    stepDiv,
                    thumbWidth,
                    position

                if (this.view.viewState.vertical){
                    newLeft = this.view.slider[0].offsetHeight - e.clientY-shiftY+this.view.slider[0].getBoundingClientRect().top

                }else {
                    newLeft = e.clientX - shiftX - this.view.slider[0].getBoundingClientRect().left
                }
                stepDiv = Math.round((max * newLeft / this.view.sliderEdge) / step)
                thumbWidth = (stepDiv * step)
                position = thumbWidth / max * this.view.sliderEdge

                if (this.view.viewState.vertical){
                    let progress = thumbWidth / max * 100
                    this.view.pointer[0].style.bottom = pointerKeeper(position) + 'px';
                    this.view.sliderValue[0].style.bottom =  pointerKeeper(position) + 'px';
                    this.view.progressBar[0].style.height = pointerKeeper(progress, 0, 100)+ '%'

                }else {
                    let progress = thumbWidth / max * 100
                    this.view.pointer[0].style.left = pointerKeeper(position) + 'px';
                    this.view.sliderValue[0].style.left =  pointerKeeper(position) + 'px';
                    this.view.progressBar[0].style.width = pointerKeeper(progress, 0, 100)+ '%'
                }

                // решить проблему со сдвигом
                let pos = this.view.pointer[0].getBoundingClientRect().left -  this.view.slider[0].getBoundingClientRect().left
                let sum = (max-min)/100

                let test = (max-min) * Math.round(position/this.view.sliderEdge * 100)/(max-min)


                let value = (max-min) * Math.round(position/this.view.sliderEdge * 100)/100 + min
                value = test
                    // value = pointerKeeper((stepDiv * step), min, max )
                this.view.sliderValue[0].innerText =  pointerKeeper(value, this.model.min, this.model.max)

                // shiftX = shiftX*0.5
                // let newPos = e.pageX - shiftX - this.view.slider[0].getBoundingClientRect().left
                // let value = Math.round(Math.abs(this.model.max + this.model.min) *newPos/this.view.sliderEdge)
                // this.view.thumbFrom[0].style.left = pointerKeeper( newPos) + 'px'
                // this.view.sliderValue[0].style.left = pointerKeeper( newPos) + 'px'
                // this.view.sliderValue[0].innerText = pointerKeeper(value, this.model.min, this.model.max)
                // this.view.progressBar[0].style.width = pointerKeeper( newPos) + 'px'
                // console.log(e.pageX - this.view.slider[0].getBoundingClientRect().left)
            }
            const onPointerUp = () => {
                document.removeEventListener('pointermove', onPointerMove)
                document.removeEventListener('pointerup', onPointerUp)
            }
            document.addEventListener('pointermove', onPointerMove)
            document.addEventListener('pointerup', onPointerUp)

    }
    // defPosition = (shiftX, event)=>{
    //     this.sliderEdge = this.view.slider.outerWidth() - this.view.thumbFrom.outerWidth()
    //     let {step, min, max} = this.model.getOptions()
    //     let newLeft = event.clientX - shiftX - this.view.slider[0].getBoundingClientRect().left
    //     console.log(newLeft)
    //     // let stepDiv = Math.round((max * newLeft / this.sliderEdge) / step)
    //
    //     // let thumbWidth = (stepDiv * step)
    //     // return Math.round(thumbWidth / max * this.sliderEdge)
    //     return newLeft
    // }
    //
    // onPointerMove = (event) => {
    //     event.preventDefault()
    //     let position = this.defPosition( this.shiftX, event)
    //     this.view.changeThumbPosition(position, this.view.thumbFrom)
    // }
    //
    // handleMouseEvents = ()=>{
    //     this.view.slider[0].onpointerdown = ((event)=>{
    //          console.log(123)
    //          this.shiftX = event.clientX - event.target.getBoundingClientRect().left
    //          document.addEventListener('pointermove', this.onPointerMove);
    //          this.onPointerMove(event)
    //     })
    //     document.addEventListener('pointerup', () => {
    //         document.removeEventListener('pointermove', this.onPointerMove)
    //     })
    // }

}}




// export function SliderController(model, view) {
//     $('body').ready( () => {
//         let {min, max} = model.getModel()
//         const thumbFrom: HTMLElement = document.querySelector('.range-slider-thumb-lower')
//         const thumbTo :HTMLElement = document.querySelector('.range-slider-thumb-upper')
//
//         const rangeSlider: HTMLElement = document.querySelector('.range-slider')!;
//
//         const progressInput: HTMLInputElement = document.querySelector('.colorBar')
//         const progressThumb: HTMLInputElement = document.querySelector('.colorThumb')
//         const stepInput: HTMLInputElement = document.querySelector('.step')
//         const minInput: HTMLInputElement = document.querySelector('.min')
//         const maxInput: HTMLInputElement = document.querySelector('.max')
//         const fromInput: HTMLInputElement = document.querySelector('.from')
//         let endSlider = rangeSlider.offsetWidth - thumbFrom.offsetWidth
//
//
//         progressInput.addEventListener('input', () => {
//             model.setColorBar(progressInput.value)
//         })
//         progressThumb.addEventListener('input', () => {
//             model.setColorThumb(progressThumb.value)
//         })
//         stepInput.addEventListener('input', () => {
//             model.setStep(+stepInput.value)
//             fromInput.setAttribute("step", stepInput.value)
//         })
//         minInput.addEventListener('change', () => {
//             model.setMin(+minInput.value)
//             view.renderScale()
//         })
//         maxInput.addEventListener('change', () => {
//             model.setMax(+maxInput.value)
//             view.renderScale()
//         })
//         fromInput.addEventListener('input', () => {
//             model.setFrom(+fromInput.value)
//             let {from, min, max} = model.getModel()
//             view.changeThumbPosition(view.convertValueToPx(from))
//
//         })
//
//         const defPosition = (shiftX, event)=>{
//             let {step} = model.getModel()
//             let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
//             let stepDiv = Math.round((max * newLeft / endSlider) / step)
//             let thumbWidth = (stepDiv * step)
//             return Math.round(thumbWidth / max * endSlider)
//         }
//
//
//         // thumbFrom.onpointerdown = (event) => {
//         //     event.preventDefault()
//         //     let shiftX = event.clientX - thumbFrom.getBoundingClientRect().left
//         //     document.addEventListener('pointermove', onPointerMove);
//         //     function onPointerMove(event) {
//         //         let position = defPosition(shiftX,event)
//         //         model.setFrom(position)
//         //         view.changeThumbPosition(position, thumbFrom)
//         //     }
//         //     document.addEventListener('pointerup', () => {
//         //         document.removeEventListener('pointermove', onPointerMove)
//         //     })
//         // }
//
//
//         // thumbTo.onpointerdown = (event) => {
//         //     event.preventDefault()
//         //     let shiftX = event.clientX - thumbTo.getBoundingClientRect().left
//         //     document.addEventListener('pointermove', onPointerMove);
//         //     function onPointerMove(event) {
//         //         let position = defPosition(shiftX,event)
//         //         model.setTo(position)
//         //         view.changeThumbPosition(position, thumbTo)
//         //     }
//         //     document.addEventListener('pointerup', () => {
//         //         document.removeEventListener('pointermove', onPointerMove)
//         //     })
//         // }
//     })
//
//
// }
