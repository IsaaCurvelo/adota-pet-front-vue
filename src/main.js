import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import {store} from './store';

import Home from '@/components/Home'
import LoginUsuario from '@/components/Usuario/LoginUsuario'
import CadastroUsuario from '@/components/Usuario/CadastroUsuario'
import Perfil from '@/components/Usuario/Perfil'
import MeusPets from '@/components/Usuario/MeusPets'


import NotFound from '@/components/NotFound'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/logar', component: LoginUsuario },
  { path: '/registrar', component: CadastroUsuario },
  { path: '/perfil', component: Perfil },
  { path: '/meus-pets', component: MeusPets },
  { path: '/*', component: NotFound },
]

const router = new VueRouter({
  routes,
  mode : 'history'
})

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
