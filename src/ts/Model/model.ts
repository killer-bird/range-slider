import {ModelOptions} from "../interfaces";
import {defaultSettings} from "./defaultModel";

export default class Model {
    public options: ModelOptions = defaultSettings

    constructor(options: ModelOptions) {
        console.log(options)
        this.setOptions()
        console.log(this.options)

    }

    public setOptions() {
        const {min, max, step, from, to, vertical, color, scale, interval} = this.options
        this.options = {...this.options, min, max, step, from, to, vertical, color, scale, interval}
    }


}