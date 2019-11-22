import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store  from './store';
import router from './router';
import { http } from './http';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  http,
  render: h => h(App)
}).$mount('#app')
