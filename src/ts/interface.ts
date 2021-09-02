export function SliderController(model, view) {

    let {min, max} = model.getModel()

    const thumb: HTMLElement = document.querySelector('.range-slider-thumb-lower')
    const rangeSlider: HTMLElement = document.querySelector('.range-slider')!;
    const progressInput: HTMLInputElement = document.querySelector('.colorBar')
    const progressThumb: HTMLInputElement = document.querySelector('.colorThumb')
    const stepInput:HTMLInputElement = document.querySelector('.step')
    const minInput:HTMLInputElement = document.querySelector('.min')
    const maxInput:HTMLInputElement = document.querySelector('.max')
    const fromInput:HTMLInputElement = document.querySelector('.from')
    let endSlider = rangeSlider.offsetWidth - thumb.offsetWidth

    progressInput.addEventListener('input', () => {
        model.setColorBar(progressInput.value)
    })
    progressThumb.addEventListener('input', () => {
        model.setColorThumb(progressThumb.value)
    })
    stepInput.addEventListener('input', () => {
        model.setStep(+stepInput.value)
        fromInput.setAttribute("step",stepInput.value)
    })
    minInput.addEventListener('change', () => {
        model.setMin(+minInput.value)
        view.renderScale()
    })
    maxInput.addEventListener('change', () => {
        model.setMax(+maxInput.value)
        view.renderScale()
    })
    fromInput.addEventListener('input', ()=>{
        model.setFrom(+fromInput.value)
        let {from, min, max}= model.getModel()
        view.changeThumbPosition(view.convertValueToPx(from) )

    })

    rangeSlider.onpointerdown = (event) => {
        event.preventDefault()
        let shiftX = event.clientX - thumb.getBoundingClientRect().left
        let clickLeft = event.clientX - (thumb.offsetWidth / 2) - rangeSlider.getBoundingClientRect().left
        view.changeThumbPosition(clickLeft);
        fromInput.value = thumb.innerHTML
        document.addEventListener('pointermove', onPointerMove);

        function onPointerMove(event) {
            let {step} = model.getModel()
            let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
            let stepDiv = Math.round((max*newLeft/endSlider)/step)
            let thumbWidth = (stepDiv * step)
            view.changeThumbPosition(Math.round(thumbWidth / max * endSlider))
            fromInput.value = thumb.innerHTML
        }

        document.addEventListener('pointerup', () => {
            document.removeEventListener('pointermove', onPointerMove)
        })
    }
}
