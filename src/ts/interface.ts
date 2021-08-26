export function SliderController(model, view) {

    const thumb: HTMLElement = document.getElementsByClassName('range-slider-thumb')[0] as HTMLElement
    const rangeSlider: HTMLElement  = document.querySelector('.range-slider')
    const progressBar: HTMLElement = document.querySelector('.range-slider-progress')
    const scale:HTMLElement = document.querySelector('.range-slider-scale')
    const box = rangeSlider.getBoundingClientRect()


    const progressInput = <HTMLInputElement>document.querySelector('.colorBar')
    const progressThumb = <HTMLInputElement>document.querySelector('.colorThumb')

    progressInput.addEventListener('input',()=>{
        model.setColorBar(progressInput.value)
    })
    progressThumb.addEventListener('input',()=>{
        model.setColorThumb(progressThumb.value)


    })
    thumb.onmousedown = function (event) {
        event.preventDefault();
        let shiftX = event.clientX - thumb.getBoundingClientRect().left
        document.addEventListener('mousemove', onMouseMove);
        function onMouseMove(event){
            let step :number= 1;
            let min :number= 1;
            let max :number= 1000;
            let newLeft = event.clientX - shiftX - rangeSlider.getBoundingClientRect().left
            let left = max - min/ step
            if (newLeft < 0){
                newLeft = 0;
            }
            let rightEdge = rangeSlider.offsetWidth - thumb.offsetWidth
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            thumb.style.left = newLeft + 'px';
            thumb.innerHTML = Math.round(max*(newLeft / rightEdge * 100/100)) +''
            progressBar.style.width = Math.round(newLeft/rightEdge*100) + '%'
            thumb.style.color = 'white'
            thumb.style.textAlign = 'center'
        }
        document.addEventListener('mouseup', ()=>{
            document.removeEventListener('mousemove',onMouseMove)
        })
    }
}