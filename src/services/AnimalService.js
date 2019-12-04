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

function atualizar(animal){
  return axios.put("animais/" + animal.id, animal, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export { todosAnimais, todosAnimaisPorUsuario, cadastrar, atualizar }