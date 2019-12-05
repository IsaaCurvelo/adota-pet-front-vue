import axios from './config'

function todasAdocoesaConfirmar(usuario) {
  return axios.get("adocaos/usuario/" + usuario.id)
}

function cadastrar(adocao) {
  return axios.post("adocaos", adocao, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

function confirmarAdocao(adocao) {
  return axios.put("adocaos/confirmar/" + adocao.id)
}

function deletarAdocao(adocao) {
  return axios.delete("adocaos/" + adocao.id)
}


export { cadastrar, todasAdocoesaConfirmar, confirmarAdocao, deletarAdocao }