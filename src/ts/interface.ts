export function SliderController(model, view) {

    const thumb: HTMLElement = document.querySelector('.range-slider-thumb')
    const rangeSlider: HTMLElement  = document.querySelector('.range-slider')!;
    const progressBar: HTMLElement = document.querySelector('.range-slider-progress')
    const scale:HTMLElement = document.querySelector('.range-slider-scale')
    const box = rangeSlider.getBoundingClientRect()
    let {step,min, max} = model.getModel()


    const progressInput:HTMLInputElement = document.querySelector('.colorBar')
    const progressThumb:HTMLInputElement = document.querySelector('.colorThumb')

    progressInput.addEventListener('input',()=>{
        model.setColorBar(progressInput.value)
    })
    progressThumb.addEventListener('input',()=>{
        model.setColorThumb(progressThumb.value)
    })
    rangeSlider.onmousedown = (event) => {
        event.preventDefault()
        let rightEdge = rangeSlider.offsetWidth - thumb.offsetWidth
        let clickLeft = event.clientX-rangeSlider.getBoundingClientRect().left
        if (clickLeft > rightEdge){
            clickLeft = rightEdge
        }

        thumb.style.left = clickLeft + 'px'
        let shiftX = event.clientX - thumb.getBoundingClientRect().left
        document.addEventListener('mousemove', onMouseMove);
        let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
        let now = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left

        progressBar.style.width = now / rightEdge *100 + '%'
        thumb.innerHTML = Math.round(max*(now / rightEdge * 100/100)) +''

        function onMouseMove(event) {
            let now = thumb.getBoundingClientRect().left - rangeSlider.getBoundingClientRect().left
            let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
            if (newLeft < 0){
                newLeft = 0;
            }
            console.log(newLeft)
            let rightEdge = rangeSlider.offsetWidth - thumb.offsetWidth
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            console.log(now / rightEdge *100 + ' %')
            let altshiftX = rightEdge*(step/max * 100/100);
            thumb.style.left = now  + 'px';
            progressBar.style.width = now / rightEdge *100 + '%'
            thumb.innerHTML = Math.round(max*(newLeft / rightEdge * 100/100)) +''
        }
        document.addEventListener('mouseup', ()=>{
            document.removeEventListener('mousemove',onMouseMove)
        })



    }
    thumb.onmousedown = function (event) {
        event.preventDefault()
        let shiftX = event.clientX - thumb.getBoundingClientRect().left
        document.addEventListener('mousemove', onMouseMove);
        function onMouseMove(event){
            let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
            console.log(event.clientX)
            if (newLeft < 0){
                newLeft = 0;
            }
            let rightEdge = rangeSlider.offsetWidth - thumb.offsetWidth
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            let altshiftX = rightEdge*(step/max * 100/100);
            console.log(altshiftX)
            thumb.style.left = newLeft + 'px';
            thumb.innerHTML = Math.round(max*(newLeft / rightEdge * 100/100)) +''
            // progressBar.style.width = Math.round(newLeft/rightEdge*100) + '%'

        }
        document.addEventListener('mouseup', ()=>{
            document.removeEventListener('mousemove',onMouseMove)
        })
    }

}