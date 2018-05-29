import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./router-config"
import App from "./App.vue"
require('./css/iconfont.css')
import Alert from './components/alert/' 
window.alert = Alert

Vue.use(VueRouter);

Vue.config.debug = true

const router = new VueRouter({
  routes 
})


new Vue({
  el:'#app',
  router,
  render: h => h(App)
})
