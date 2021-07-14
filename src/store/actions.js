import axios from "axios"
import { setHeaderToken } from '../utils/auth';
import { removeHeaderToken } from '../utils/auth';

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

    login({ dispatch, commit }, data) {
        return new Promise((resolve, reject) =>{
            axios.post('auth/login', data).then(response => {
                const token = response.data.content.access_token
                localStorage.setItem('token', token)
                setHeaderToken(token)
                dispatch('get_user')
                resolve(response)
            }).catch(err => {
                commit('reset_user')
                localStorage.removeItem('token')
                reject(err)
            })
        })
    },

    async get_user({commit}){ 
        if(!localStorage.getItem('token')){
          return
        }
        try{ 
          let response = await axios.get('user/profile')
            commit('setUserData', response.data)
        } catch (error){
            commit('reset_user') 
            removeHeaderToken()
            localStorage.removeItem('token')
            return error
        } 
      }, 

      logout({ commit }) {
        return new Promise((resolve) => {
         commit('reset_user')
         localStorage.removeItem('token')
         removeHeaderToken()
         resolve()
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