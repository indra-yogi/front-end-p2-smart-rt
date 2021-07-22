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
                if(res.data === 'ok')
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
                if(res.data === 'ok')
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