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
    let notifyObservers = (data)=>{
        let observerSnapshot = observers.slice(0)
        for(let i in observerSnapshot){
            console.log(observerSnapshot[i])
            observerSnapshot[i].subscribe()

        }
        return data
    }
    return {

        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers,
        notify: notifyObservers
    }
}