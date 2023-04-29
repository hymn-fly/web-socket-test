import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import Directives from '../plugin/directives'

import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');
socket.on("connect", () => console.log(socket.id));
socket.on("connect_error", (err) => console.log(`connect error due to ${JSON.stringify(err)}`));

Vue.prototype.$socket = socket;

Vue.use(VueMaterial)
Vue.use(Directives)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')