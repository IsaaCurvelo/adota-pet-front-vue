import axios from './config'

function todasEspecies() {
  return axios.get("especies")
}

export { todasEspecies }