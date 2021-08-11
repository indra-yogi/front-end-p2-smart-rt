import Noty from "noty"

export const notyError = (message) => {
    defaultNoty(message, "error")
}

export const notySuccess = (message) => {
    defaultNoty(message, "success")
}

const defaultNoty = (message, type) => {
    new Noty({
        type,
        text: message,
        timeout: 1500
    }).show()
}