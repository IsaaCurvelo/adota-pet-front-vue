import axios from './config'

function todosAnimais() {
  return axios.get("animais")
}

export { todosAnimais }