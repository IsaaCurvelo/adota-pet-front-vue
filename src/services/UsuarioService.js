import axios from './config'

function logar(payload) {
  return axios.post("usuarios/logar", payload, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

function cadastrar(payload) {
  return axios.post("usuarios", payload, { 
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export { logar, cadastrar }