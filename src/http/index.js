import Vue from 'vue'
import VueResource from 'vue-resource'
import services from'./services'

Vue.use(VueResource)

const http = Vue.http

http.options.root = 'http://localhost:6969/'

Object.keys(services).map(service => {
  console.log(Vue.resource('', {}, services[service]))
  services[service] = Vue.resource('', {}, services[service])
})

export { http }
export default services