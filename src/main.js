import Vue from 'vue'
import App from './App'
import "@/assets/weui.css"
import moment from "moment"
import store from "@/store"
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$moment = moment
const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
  config: {
    
  }
}
