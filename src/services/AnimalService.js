import axios from './config'

function todosAnimais() {
  return axios.get("animais")
}

function todosAnimaisPorUsuario(usuario) {
  return axios.get("animais/usuario/" + usuario.id)
}

function cadastrar(formData) {
  return axios.post("animais", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export { todosAnimais, todosAnimaisPorUsuario, cadastrar }