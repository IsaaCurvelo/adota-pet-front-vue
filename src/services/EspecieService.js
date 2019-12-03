import axios from './config'

function todasEspecies() {
  return axios.get("especies")
}

function cadastrar (especie) {
  return axios.post("especies", especie, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export { todasEspecies, cadastrar }