import axios from './config'

function todasRacas() {
  return axios.get("racas")
}

function todasRacasPorEspecie(especie) {
  return axios.get("racas/especie/" + especie.id)
}

function cadastrar (raca) {
  return axios.post("racas", raca, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export { todasRacas, todasRacasPorEspecie, cadastrar }