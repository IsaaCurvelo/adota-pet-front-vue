import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'

Vue.use(Router)

const router =  new Router({
  routes : [
    { path: '/', component: () => import('@/components/Home'), name: 'home' },
    { path: '/logar', component: () => import('@/components/Usuario/LoginUsuario'), name: 'logar' },
    { path: '/registrar', component: () => import('@/components/Usuario/CadastroUsuario'), name: 'registrar' },
    { path: '/perfil', component: () => import('@/components/Usuario/Perfil'), name: 'perfil' },
    { path: '/meus-pets', component: () => import('@/components/Usuario/MeusPets'), name: 'meusPets' },
    { path: '/*', component: () => import('@/components/NotFound'), name: 'notFound' },
  ],
  mode: 'history'
})

router.beforeEach(beforeEach)

export default router