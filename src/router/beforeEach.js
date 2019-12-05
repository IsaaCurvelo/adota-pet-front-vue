import store from '../store'

export default async (to, from, next) => {
  if (to.name !== 'logar' && to.name !== 'registrar' && !store.getters['isLogged']) {
    try {
      await store.dispatch('checkUsuarioLogado')
      next({ name: to.name })
    } catch (error) {
      next({ name: 'logar' })
    }
  } else {
    if ((to.name === 'logar' || to.name === 'registrar') && store.getters['isLogged']) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}