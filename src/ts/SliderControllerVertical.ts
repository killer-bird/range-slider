export function SliderControllerVertical(model, view) {
    let {step, min, max, position} = model.getModel()
    const thumb: HTMLElement = document.querySelector('.range-slider-thumb_vertical')
    const rangeSlider: HTMLElement = document.querySelector('.range-slider_vertical')!;
    const progressBar: HTMLElement = document.querySelector('.range-slider-progress_vertical')
    // const scale: HTMLElement = document.querySelector('.range-slider-scale_vertical')
    const box = rangeSlider.getBoundingClientRect()

    const progressInput: HTMLInputElement = document.querySelector('.colorBar')
    const progressThumb: HTMLInputElement = document.querySelector('.colorThumb')

    progressInput.addEventListener('input', () => {
        model.setColorBar(progressInput.value)
    })
    progressThumb.addEventListener('input', () => {
        model.setColorThumb(progressThumb.value)
    })
    rangeSlider.onmousedown = (event) => {
        event.preventDefault()
        let shiftY = event.clientY - thumb.getBoundingClientRect().top
        let rightEdge = rangeSlider.offsetHeight - thumb.offsetHeight
        const rangeKeeper = (count: number, min: number = 0, max: number = rightEdge) => {
            if (count < min) {
                return min
            }
            if (count > max) {
                return max
            }
            return count
        }
        let clickLeft = event.clientY - (thumb.offsetHeight / 2) - rangeSlider.getBoundingClientRect().top
        thumb.style.top = rangeKeeper(clickLeft) + 'px'
        document.addEventListener('mousemove', onMouseMove);
        let newLeft = event.clientY - shiftY - rangeSlider.getBoundingClientRect().top
        let current = thumb.getBoundingClientRect().top - rangeSlider.getBoundingClientRect().top
        progressBar.style.height = Math.round(current / rightEdge * 100) + '%'
        thumb.innerHTML = rangeKeeper(Math.round(min + (max - min) * (newLeft / rightEdge * 100 / 100)), min, max) + ''

        function onMouseMove(event) {
            let current = thumb.getBoundingClientRect().top - rangeSlider.getBoundingClientRect().top
            let newLeft = event.clientY - shiftY - rangeSlider.getBoundingClientRect().top
            let stepLeft = Math.round(newLeft / step) * step
            thumb.style.top = rangeKeeper(newLeft + stepLeft) + 'px';
            progressBar.style.height = Math.round(current / rightEdge * 100) + '%'
            thumb.innerHTML = rangeKeeper(Math.round(min + (max - min) * (rangeKeeper(newLeft + stepLeft) / rightEdge * 100 / 100)), min, max) + ''
        }

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove)
        })
    }

}

