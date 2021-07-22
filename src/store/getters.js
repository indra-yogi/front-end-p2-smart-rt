let getters = {
    maritals: state => {
        return state.maritals
    },
    marital: state => {
        return state.marital
    },

    divorces: state => {
        return state.divorces
    },
    divorce: state => {
        return state.divorce
    },

    user: state => {
        return state.user
    },
    users: state => {
        return state.users
    },

    authenticated: state => {
        return state.authenticated
    },

    totals: state => {
        return state.totals
    },

    image: state => {
        return state.image
    }
}

export default getters