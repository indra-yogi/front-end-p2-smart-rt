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
    AUTH_RESET_AUTH_DATA(state) {
        state.auth = {
            token: null,
            user: null,
            authenticated: false
        }
    },
    AUTH_SET_AUTH_DATA(state, data) {
        state.auth = {
            token: data.token,
            user: data.user,
            authenticated: data.authenticated
        }
    },
    CREATE_USERS(state, users) {
        state.maritals.unshift(users)
    },
    GET_TOTAL(state, totals) {
        return state.totals = totals
    },
    FETCH_IMAGE(state, image) {
        return state.image = image
    }
}

export default mutations