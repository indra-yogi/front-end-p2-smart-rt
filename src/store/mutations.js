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
    UPDATE_MARITALS(state, marital) {
        let i = state.maritals.findIndex(maritals => maritals.id === marital.id)
        state.maritals[i] = marital
    },

    setMaritalData(state, marital) {
        state.marital = marital
    },

    CREATE_DIVORCES(state, divorces) {
        state.maritals.unshift(divorces)
    },
    FETCH_DIVORCES(state, divorces) {
        return state.divorces = divorces
    },
    DELETE_DIVORCES(state, divorce) {
        let i = state.divorces.findIndex(divorces => divorces.id === divorce.id)
        state.divorces.splice(i, 1)
    },
    UPDATE_DIVORCES(state, divorce) {
        let i = state.divorces.findIndex(divorces => divorces.id === divorce.id)
        state.divorces[i] = divorce
    },

    setDivorceData(state, data) {
        return state.divorce = data
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
    },

    FETCH_IMAGE(state, image) {
        return state.image = image
    }
}

export default mutations