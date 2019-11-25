import axios from './config'

function todosAnimais() {
  return axios.get("animais")
}

function todosAnimaisPorUsuario(usuario) {
  return axios.get("animais/usuario/" + usuario.id)
}

export { todosAnimais, todosAnimaisPorUsuario }