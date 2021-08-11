import {getApi, postApi} from "./api";

export const authApiLogin = (payload) => {
    return postApi("auth/login", payload)
}

export const authApiCurrentUser = (token) => {
    return getApi("auth/currentUser", token)
}

export const authApiCreateUser = (payload, token) => {
    return postApi("auth/register", payload, token)
}

export const authApiCreateUserAdmin = (payload, token) => {
    return postApi("auth/adminReg", payload, token)
}