import axios from './config'

function todasRacas() {
  return axios.get("racas")
}

function todasRacasPorEspecie(especie) {
  return axios.get("racas/especie/" + especie.id)
}

export { todasRacas, todasRacasPorEspecie }