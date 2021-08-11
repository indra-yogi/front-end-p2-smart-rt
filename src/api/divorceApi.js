import {getApi, postApiFormData, putApi} from "./api";

export const divorceApiIndex = (page, perPage, name, token) => {
    return getApi(`divorce?page=${page}&perPage=${perPage}&name=${name}`, token)
}

export const divorceApiDetail = (id, token) => {
    return getApi(`divorce/${id}`, token)
}

export const divorceApiSetApprove = (id, token) => {
    return putApi(`divorce/set/${id}/APPROVED`, null, token)
}

export const divorceApiSetWaiting = (id, token) => {
    return putApi(`divorce/set/${id}/WAITING`, null, token)
}

export const divorceApiSetReject = (id, token) => {
    return putApi(`divorce/set/${id}/REJECTED`, null, token)
}

export const divorceApiCreate = (body, token) => {
    return postApiFormData(`divorce`, body, token)
}