class Model {
    constructor(private step?: number,
                private vertical?: boolean,
                private colorBar?: string,
                private colorMark?: string,
                private range?: number[]) {
        this.step = step || 1
        this.vertical = vertical || false
        this.colorBar = colorBar || '#eb4034'
        this.colorMark = colorMark || '#eb4034'
        this.range = range || [1,100]
    }

    setStep(step :number):void {
        this.step = step;
    }
    getModel(){
        return {
            step: this.step,
            vertical: this.vertical,
            colorBar: this.colorBar
             }

    }
}

export default Model