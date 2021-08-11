import {getApi, postApiFormData, putApi} from "./api";

export const maritalApiIndex = (page, perPage, husbandName, token) => {
    return getApi(`marital?page=${page}&perPage=${perPage}&husbandName=${husbandName}`, token)
}

export const maritalApiDetail = (id, token) => {
    return getApi(`marital/${id}`, token)
}

export const maritalApiSetApprove = (id, token) => {
    return putApi(`marital/set/${id}/APPROVED`, null, token)
}

export const maritalApiSetWaiting = (id, token) => {
    return putApi(`marital/set/${id}/WAITING`, null, token)
}

export const maritalApiSetReject = (id, token) => {
    return putApi(`marital/set/${id}/REJECTED`, null, token)
}

export const maritalApiCreate = (body, token) => {
    return postApiFormData(`marital`, body, token)
}