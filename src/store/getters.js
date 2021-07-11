let getters = {
    maritals: state => {
        return state.maritals
    },
    divorces: state => {
        return state.divorces
    },
    isLogged: state => !!state.user,
    users: state => {
        return state.users
    },
}

export default getters