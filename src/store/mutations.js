import axios from 'axios'

let mutations = {
    CREATE_MARITALS(state, maritals) {
        state.maritals.unshift(maritals)
    },
    FETCH_MARITALS(state, maritals) {
        return state.maritals = maritals
    },
    DELETE_MARITALS(state, maritals) {
        let index = state.maritals.findIndex(item => item.id === maritals.id)
        state.maritals.splice(index, 1)
    },

    CREATE_DIVORCES(state, divorces) {
        state.maritals.unshift(divorces)
    },
    FETCH_DIVORCES(state, divorces) {
        return state.divorces = divorces
    },
    DELETE_Divorces(state, divorces) {
        let index = state.divorces.findIndex(item => item.id === divorces.id)
        state.divorces.splice(index, 1)
    },

    setUserData(state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common.Authorization = 'Bearer ${userData.token}' 
    },

    clearUserData(state, userData) {
        state.user = userData
        localStorage.removeItem('user', JSON.stringify(userData))
        location.reload()
    },

    CREATE_USERS(state, users) {
        state.maritals.unshift(users)
    },
}

export default mutations