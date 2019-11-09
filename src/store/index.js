import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    usuario: {
      id: '',
      nome: '',
      email: '',
      telefone: '',
    }
  },
  mutations: {
    
  },
  actions: {},
  getters: {
    usuario(state) {
      return state.usuario;
    }
  }
});
