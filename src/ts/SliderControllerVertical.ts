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
        let current = thumb.getBoundingClientRect().top - rangeSlider.getBoundingClientRect().top
        progressBar.style.height = Math.round(current / rightEdge * 100) + '%'
        thumb.innerHTML = rangeKeeper(Math.round(min + (max - min) * (current / rightEdge)), min, max) + ''
        function onMouseMove(event) {
            let current = thumb.getBoundingClientRect().top - rangeSlider.getBoundingClientRect().top
            let newLeft = event.clientY - shiftY - rangeSlider.getBoundingClientRect().top
            let stepDiv = Math.round((max*newLeft/rightEdge)/step)
            let thumbWidth = (stepDiv * step)
            thumb.innerHTML = rangeKeeper((stepDiv * step), min, max ) + ''
            thumb.style.top = rangeKeeper( thumbWidth / max * rightEdge) + 'px';
            progressBar.style.height = Math.round(current / rightEdge * 100) + '%'
        }

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove)
        })
    }

}

