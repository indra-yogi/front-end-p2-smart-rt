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

    setUserData(state, data) {
        state.user = data
        state.authenticated = true
    },
    
    reset_user (state) {
        state.user = null
        state.authenticated = false
    },

    clearUserData(state, userData) {
        state.user = userData
        localStorage.removeItem('user', JSON.stringify(userData))
        location.reload()
    },

    CREATE_USERS(state, users) {
        state.maritals.unshift(users)
    },

    FETCH_USERS(state, users) {
        return state.users = users
    },

    GET_TOTAL(state, totals) {
        return state.totals = totals
    }
}

export default mutations