import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    key: "vuex",
    storage: window.localStorage
})

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    plugins: [vuexLocal.plugin]
})