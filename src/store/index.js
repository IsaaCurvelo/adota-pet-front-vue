import Vue from 'vue'
import Vuex from 'vuex'
import services from '@/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {},
    token:''
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    setUsuario({ commit }, payload) {
      commit('setUsuario', payload)
    },
    setToken({ commit }, payload) {
      commit('setToken', payload)
    },
    doLogin(context, payload) {
      console.log(services)
      return services.login(payload)
    }
  }
});
