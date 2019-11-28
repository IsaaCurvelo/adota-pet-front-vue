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

function alterarSenha(usuario) {
  return axios.put("usuarios/alterar-senha/" + usuario.id, usuario, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}


function alterarUsuario(usuario) {
  return axios.put("usuarios/" + usuario.id, usuario, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export { logar, cadastrar, alterarSenha, alterarUsuario }