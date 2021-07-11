import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:8000/api/'

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})