import {notyError} from "./noty";

export const validate = (message) => {
    const err = JSON.parse(message)

    for (let [key, value] of Object.entries(err)) {
        notyError(`${key} -  ${value}`)
    }
}