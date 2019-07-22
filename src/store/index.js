import Vue from 'vue'
import Vuex from 'vuex'
import example from './example.js'
import members from './members.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        members,
        example
    }
});