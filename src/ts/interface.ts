export function SliderController(model, view) {

    const thumb: HTMLElement = document.querySelector('.range-slider-thumb')
    const rangeSlider: HTMLElement = document.querySelector('.range-slider')!;
    const progressBar: HTMLElement = document.querySelector('.range-slider-progress')
    const scale: HTMLElement = document.querySelector('.range-slider-scale')
    const box = rangeSlider.getBoundingClientRect()
    let {step, min, max} = model.getModel()


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
        console.log()
        let shiftX = event.clientX - thumb.getBoundingClientRect().left
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
        let clickLeft = event.clientX - (thumb.offsetWidth / 2) - rangeSlider.getBoundingClientRect().left
        console.log(event.clientX)
        thumb.style.left = rangeKeeper(clickLeft) + 'px'


        document.addEventListener('mousemove', onMouseMove);
        let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
        let current = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left
        progressBar.style.width = Math.round(current / rightEdge * 100) + '%'
        thumb.innerHTML = rangeKeeper(Math.round(min + (max - min) * (newLeft / rightEdge * 100 / 100)), min, max) + ''


        function onMouseMove(event) {
            let current = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left
            let newLeft = event.clientX - shiftX- rangeSlider.getBoundingClientRect().left
            let stepLeft = Math.round(newLeft/step)*step
            console.log(stepLeft)
            thumb.style.left = rangeKeeper(newLeft + stepLeft) + 'px';
            progressBar.style.width = Math.round(current / rightEdge * 100) + '%'
            thumb.innerHTML = rangeKeeper(Math.round(min + (max - min) * (rangeKeeper(newLeft+stepLeft) / rightEdge * 100 / 100)), min, max) + ''
        }

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove)
        })

    }
    // thumb.onmousedown = function (event) {
    //     event.preventDefault()
    //     let shiftX = event.clientX - thumb.getBoundingClientRect().left
    //     document.addEventListener('mousemove', onMouseMove);
    //     function onMouseMove(event){
    //         let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
    //         console.log(event.clientX)
    //         if (newLeft < 0){
    //             newLeft = 0;
    //         }
    //         let rightEdge = rangeSlider.offsetWidth - thumb.offsetWidth
    //         if (newLeft > rightEdge) {
    //             newLeft = rightEdge;
    //         }
    //
    //         let altshiftX = rightEdge*(step/max * 100/100);
    //         console.log(altshiftX)
    //         thumb.style.left = newLeft + 'px';
    //         thumb.innerHTML = Math.round(max*(newLeft / rightEdge * 100/100)) +''
    //         // progressBar.style.width = Math.round(newLeft/rightEdge*100) + '%'
    //
    //     }
    //     document.addEventListener('mouseup', ()=>{
    //         document.removeEventListener('mousemove',onMouseMove)
    //     })
    // }

}