export default class Observer {
    public model;
    public controller;
    public proxyModel

    constructor(model, controller) {
        this.model = model
        this.controller = controller
        this.proxyModel = new Proxy(model, {
            set(target: any, p: string | symbol, value: any, receiver: any): boolean {
                switch (p) {
                    case "step":
                        target.setStep(value)
                        return true
                    case "min":
                        target.setMin(parseInt(value))
                        controller.updateSlider()
                        return true
                    case "max":
                        target.setMax(parseInt(value))
                        controller.updateSlider()
                        return
                    case "colorBar":
                        target.setColorBar(value)
                        controller.changeColorBar(value)
                        return
                    case "colorThumb":
                        target.setColorPointer(value)
                        controller.changeColorPointer(value)
                        return
                    case "vertical":
                        console.log("VERTICAL", value)
                        if (!target['vertical'] === value) {
                            target.setVertical(value)
                            controller.updateSlider()
                        }
                        return
                    case "scale":
                        if (!target['scale'] === value) {
                            target.setScale(value)
                            controller.updateSlider()
                        }
                        return
                    case "from":
                        let posFrom = controller.convertValueToPixels(value)
                        console.log(posFrom)
                        controller.movePointer(controller.view.pointer[0], posFrom, value)
                        target.setFrom(value)
                        return
                    case "to":
                        let posTo = controller.convertValueToPixels(value)
                        console.log(posTo)
                        controller.movePointer(controller.view.pointer[1], posTo, value)
                        target.setFrom(value)
                        return
                    case "interval":
                        if (!target['interval'] === value) {
                            target.setInterval(value)
                            controller.updateSlider()
                            return
                        }
                }
            }
        })


    }

}


export function MakeObserverSubject() {
    let observers = [];
    let addObserver = (o): void => {
        observers.push(o)
    };
    let getObservers = function () {
        return observers
    }
    let removeObserver = (o): void => {
        observers.splice(observers.indexOf(o), 1)
    }
    let notifyObservers = (func) => {
        let observerSnapshot = observers.slice(0)
        for (let i in observerSnapshot) {
            observerSnapshot[i].subscribe(func)
        }
    }

    return {

        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers,
        notify: notifyObservers
    }
}