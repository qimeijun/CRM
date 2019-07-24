import Vue from 'vue'
import Vuex from 'vuex'
import example from './example.js'
import members from './members.js'
import ipublic from './public.js'
import projects from "./projects.js"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        members,
        example,
        ipublic,
        projects
    }
});