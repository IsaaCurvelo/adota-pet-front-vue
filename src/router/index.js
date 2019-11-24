import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes : [
    { path: '/', component: () => import('@/components/Home') },
    { path: '/logar', component: () => import('@/components/Usuario/LoginUsuario') },
    { path: '/registrar', component: () => import('@/components/Usuario/CadastroUsuario') },
    { path: '/perfil', component: () => import('@/components/Usuario/Perfil') },
    { path: '/meus-pets', component: () => import('@/components/Usuario/MeusPets') },
    { path: '/*', component: () => import('@/components/NotFound') },
  ],
  mode: 'history'

});