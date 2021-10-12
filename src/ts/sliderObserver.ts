export default class Observer {
    public observers:object[]


    constructor() {
        this.observers = []
    }


    register(o:object):void{
        this.observers.push(o)
    }

    unregister(o:object):void{
        this.observers.splice(this.observers.indexOf(o),1)
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