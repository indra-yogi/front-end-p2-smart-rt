import {deleteApi, getApi, putApi} from "./api";

export const userApiUpdateUser = (id, payload, token) => {
    return putApi(`user/${id}`, payload, token)
}

export const userApiAdminUserList = (token) => {
    return getApi(`user/allAdmin`, token)
}

export const userApiAdminDelete = (id, token) => {
    return deleteApi(`user/admin/${id}`, token)
}