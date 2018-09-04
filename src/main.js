import Vue from 'vue'
import App from './App'
import store from '@/store'

import "@/assets/weui.css"

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...store,
    App
})
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        "pages": [
          "pages/index/main",
          "pages/login/main",
          "pages/authorize/main",
          "pages/me/main",
          "pages/publish/main"
        ],
        "window": {
          "backgroundTextStyle": "light",
          "navigationBarBackgroundColor": "#3dc74b",
          "navigationBarTitleText": "厨具商城",
          "navigationBarTextStyle": "#fff"
        },
        "tabBar": {
          "backgroundColor": "#fff",
          "borderStyle": "white",
          "selectedColor": "#4eb131",
          "color": "#373737",
          "position": "bottom",
          "list": [
            {
              "pagePath": "pages/index/main",
              "iconPath": "static/images/home.png",
              "selectedIconPath": "static/images/home_a.png",
              "text": "首页"
            },
            {
              "pagePath": "pages/publish/main",
              "iconPath": "static/images/publish.png",
              "selectedIconPath": "static/images/publish_a.png",
              "text": "发布"
            },
            {
              "pagePath": "pages/me/main",
              "iconPath": "static/images/me.png",
              "selectedIconPath": "static/images/me_a.png",
              "text": "我"
            }
          ]
        }
      }
}
