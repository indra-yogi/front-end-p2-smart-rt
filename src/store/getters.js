let getters = {
    maritals: state => {
        return state.maritals
    },
    divorces: state => {
        return state.divorces
    },
    user: state => {
        return state.user
    },

    users: state => {
        return state.users
    },
    authenticated: state => {
        return state.authenticated
    }
}

export default getters