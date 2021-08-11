import axios from "axios"
import {authApiCurrentUser, authApiLogin} from "../api/authApi";

let actions = {
    createMarital({commit}, maritals) {
        axios.post('marital/store', maritals)
            .then(res => {
                commit('CREATE_MARITALS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    fetchMarital({commit}) {
        axios.get('marital/index')
            .then(res => {
                commit('FETCH_MARITALS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    fetchAllMarital({commit}) {
        axios.get('marital/getAll')
            .then(res => {
                commit('FETCH_MARITALS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    deleteMarital({commit}, marital) {
        axios.delete(`marital/delete/${marital}`)
            .then(res => {
                if (res.data === 'ok')
                    commit('DELETE_MARITALS', marital)
            }).catch(err => {
            console.log(err)
        })
    },

    getMaritalbyId({commit}, maritalId) {
        axios.get(`marital/show/${maritalId}`)
            .then(res => {
                commit('setMaritalData', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    updateMarital({commit}, marital) {
        axios.put(`marital/statusUpdate/${marital}`)
            .then(res => {
                commit('UPDATE_MARITALS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    createDivorce({commit}, divorce) {
        axios.post('divorce/store', divorce)
            .then(res => {
                commit('CREATE_DIVORCES', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    fetchDivorce({commit}) {
        axios.get('divorce/index')
            .then(res => {
                commit('FETCH_DIVORCES', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    fetchAllDivorce({commit}) {
        axios.get('divorce/getAll')
            .then(res => {
                commit('FETCH_DIVORCES', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    deleteDivorce({commit}, divorce) {
        axios.delete(`divorce/delete/${divorce}`)
            .then(res => {
                if (res.data === 'ok')
                    commit('DELETE_DIVORCES', divorce)
            }).catch(err => {
            console.log(err)
        })
    },

    updateDivorce({commit}, divorce) {
        axios.put(`divorce/statusUpdate/${divorce}`)
            .then(res => {
                commit('UPDATE_DIVORCES', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    getDivorcebyId({commit}, divorceId) {
        axios.get(`divorce/show/${divorceId}`)
            .then(res => {
                commit('setDivorceData', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    async authLogin({dispatch, commit, getters}, data) {
        try {
            const loginResponse = await authApiLogin(data)
            const authData = getters.auth

            authData.token = loginResponse.content.access_token
            authData.authenticated = true

            commit('AUTH_SET_AUTH_DATA', authData)
            await dispatch('authGetUser')
        } catch (e) {
            commit('AUTH_RESET_AUTH_DATA')
            throw e
        }
    },
    async authGetUser({commit, getters}) {
        try {
            let getUserResponse = await authApiCurrentUser(getters.auth.token)

            const authData = getters.auth
            authData.user = getUserResponse

            commit('AUTH_SET_AUTH_DATA', authData)
        } catch (e) {
            commit('AUTH_RESET_AUTH_DATA')
            throw e
        }
    },
    authLogout({commit}) {
        commit('AUTH_RESET_AUTH_DATA')
    },
    createUser({commit}, users) {
        axios.post('auth/register', users)
            .then(res => {
                commit('CREATE_USERS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    createAdmin({commit}, users) {
        axios.post('auth/adminReg', users)
            .then(res => {
                commit('CREATE_USERS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    fetchUsers({commit}) {
        axios.get('user/index')
            .then(res => {
                commit('FETCH_USERS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    fetchAdmins({commit}) {
        axios.get('user/allAdmin')
            .then(res => {
                commit('FETCH_USERS', res.data)
            }).catch(err => {
            console.log(err)
        })
    },
    fetchTotals({commit}) {
        axios.get('marital/totalCount')
            .then(res => {
                commit('GET_TOTAL', res.data)
            }).catch(err => {
            console.log(err)
        })
    },

    fetchMaritalImage({commit}, image) {
        axios.get(`marital/img/${image}`)
            .then(res => {
                commit('FETCH_IMAGE', res.data[0].marital_attachment)
            }).catch(err => {
            console.log(err)
        })
    },

    fetchDivorceImage({commit}, image) {
        axios.get(`divorce/img/${image}`)
            .then(res => {
                commit('FETCH_IMAGE', res.data[0].attachment)
            }).catch(err => {
            console.log(err)
        })
    }


}

export default actions