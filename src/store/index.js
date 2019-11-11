import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    usuario: null
  },
  mutations: {
    // more aboute changing states 
    logarUsuario(state, payload) {
      state.usuario = payload;
    },
    deslogarUsuario(state) {
      state.usuario = null;
    }
  },
  actions: {
    // more about logic and firing mutations
    logarUsuario({commit}, payload) {
      const usuario = {
        id: payload.id,
        nome: payload.nome,
        email: payload.email,
        telefone: payload.telefone        
      }

      // fire mutation
      commit('logarUsuario', usuario);
    },

    deslogarUsuario({commit}){
      commit('deslogarUsuario');
    }
  },
  getters: {
    usuario(state) {
      return state.usuario;
    }
  }
});
