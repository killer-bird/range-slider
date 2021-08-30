export function SliderController(model, view) {

    let {min, max} = model.getModel()
    const thumb: HTMLElement = document.querySelector('.range-slider-thumb')
    const rangeSlider: HTMLElement = document.querySelector('.range-slider')!;
    const progressBar: HTMLElement = document.querySelector('.range-slider-progress')
    const scale: HTMLElement = document.querySelector('.range-slider-scale')
    const box = rangeSlider.getBoundingClientRect()

    const progressInput: HTMLInputElement = document.querySelector('.colorBar')
    const progressThumb: HTMLInputElement = document.querySelector('.colorThumb')
    const stepInput:HTMLInputElement = document.querySelector('.step')
    const minInput:HTMLInputElement = document.querySelector('.min')
    const maxInput:HTMLInputElement = document.querySelector('.max')
    const fromInput:HTMLInputElement = document.querySelector('.from')
    let rightEdge = rangeSlider.offsetWidth - thumb.offsetWidth

    const rangeKeeper = (count: number, min: number = 0, max: number = rightEdge) => {
        if (count < min) {
            return min
        }
        if (count > max) {
            return max
        }
        return count
    }
    progressInput.addEventListener('input', () => {
        model.setColorBar(progressInput.value)
    })
    progressThumb.addEventListener('input', () => {
        model.setColorThumb(progressThumb.value)
    })
    stepInput.addEventListener('input', () => {
        model.setStep(+stepInput.value)
        console.log(stepInput.value)
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
        changePosition(fromInput.value)
    })

    function changePosition(value){
        model.setFrom(rangeKeeper(value, min,max))
        let {from} = model.getModel()
        thumb.style.left = from * rightEdge/(min+max) + "px"
        thumb.innerHTML = from
        let current = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left
        progressBar.style.width = Math.round(current / rightEdge * 100) + '%'
    }

    rangeSlider.onmousedown = (event) => {
        event.preventDefault()
        let shiftX = event.clientX - thumb.getBoundingClientRect().left
        let clickLeft = event.clientX - (thumb.offsetWidth / 2) - rangeSlider.getBoundingClientRect().left
        thumb.style.left = rangeKeeper(clickLeft) + 'px'
        document.addEventListener('mousemove', onMouseMove);
        let current = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left
        progressBar.style.width = Math.round(current / rightEdge * 100) + '%'
        thumb.innerHTML = rangeKeeper(Math.round(min + (max - min) * (current / rightEdge)), min, max) + ''
        console.log(current / rightEdge, )
        function onMouseMove(event) {
            let {step} = model.getModel()
            let current = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left
            let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
            let stepDiv = Math.round((max*newLeft/rightEdge)/step)
            let thumbWidth = (stepDiv * step)
            thumb.innerHTML = rangeKeeper((stepDiv * step), min, max ) + ''
            fromInput.value = thumb.innerHTML
            thumb.style.left = rangeKeeper( thumbWidth / max * rightEdge) + 'px';
            progressBar.style.width = Math.round(current / rightEdge * 100) + '%'
        }

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove)
        })
    }
}
