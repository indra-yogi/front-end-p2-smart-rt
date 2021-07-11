import axios from "axios"

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

    deleteMarital({commit}, marital) {
        axios.delete('marital/delete/${marital.id}')
            .then(res => {
                if(res.data === 'ok')
                    commit('DELETE_MARITAL', marital)
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

    deleteDivorce({commit}, divorce) {
        axios.delete('divorce/delete/${divorce.id}')
            .then(res => {
                if(res.data === 'ok')
                    commit('DELETE_DIVORCES', divorce)
            }).catch(err => {
                console.log(err)
            })
    },

    login({ commit }, credentials) {
        return axios.post('auth/login', credentials).then(({data}) => {
            commit('setUserData', data)
        })
    },

    logout({ commit }, credentials) {
        return axios.post('auth/logout', credentials).then(({data}) => {
            commit('clearUserData', data)
        })
    },

    createUser({commit}, users) {
        axios.post('auth/register', users)
            .then(res => {
                commit('CREATE_USERS', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
}

export default actions