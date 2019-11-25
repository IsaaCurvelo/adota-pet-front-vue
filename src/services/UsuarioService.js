import axios from './config'

function logar(usuario) {
  return axios.post("usuarios/logar", usuario, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

function cadastrar(usuario) {
  return axios.post("usuarios", usuario, { 
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export { logar, cadastrar }