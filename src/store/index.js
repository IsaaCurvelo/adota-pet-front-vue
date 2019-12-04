import Vue from 'vue'
import Vuex from 'vuex'
import * as local from './local'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
  },
  actions: {
    setUsuario({ commit }, payload) {
      commit('setUsuario', payload)
    },
    
    doLogin({ dispatch }, payload) {
      dispatch('setUsuario', payload)
      local.setUsuarioLocalStorage(payload)
    },

    doLogout( { commit }) {
      local.deleteUsuarioLocalStorage()
      commit('setUsuario', null)
    },

    checkUsuarioLogado({ dispatch, state }) {
      if (state.usuario) {
        console.log("[checkUsuarioLogado] -> tem usuario no state")
        return Promise.resolve(state.usuario)
      }

      const usuario = local.getUsuarioLocalStorage()

      if (!usuario) {
        return Promise.reject(new Error('Usuário inválido'))
      }

      dispatch('doLogin', usuario)
      return new Promise.resolve()
    }
  },
  getters: {
    isLogged: ({ usuario }) => {
      return !!usuario
    },
  }
});
