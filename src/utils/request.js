import wx from './wx'
import Fly from 'flyio'
import WXP from 'minapp-api-promise'
const baseUrl = "https://demo.xinbao369.com/ids/public/index.php/api/"
import { TOKEN, OPEN_ID, REGION } from "@/utils/common"
const request = new Fly()
request.config.baseURL = baseUrl
request.interceptors.request.use((request) => {
  const storageKeysArray = wx.getStorageInfoSync().keys
  if(storageKeysArray.includes(TOKEN) && request.body) {
    request.body["token"] = wx.getStorageSync(TOKEN) || ""
  }
  if(storageKeysArray.includes(REGION) && request.body) {
    request.body[REGION] = wx.getStorageSync(REGION) || ""
  }
  if(storageKeysArray.includes(OPEN_ID) && request.body) {
    request.body["openid"] = wx.getStorageSync(OPEN_ID) || ""
  }
  if(request.method == "POST") {
    request.headers["content-type"] = "application/x-www-form-urlencoded"
  }
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading();
    if(response.data.code == 1) {
      // operating success
      if(response.request.method == "POST" && response.data.msg != "") {
        WXP.showToast({
          icon: "success",
          title: response.data.msg,
          duration: 2000
        })
      }
      return promise.resolve(response.data)
    } else if(response.data.code == 2) {
      //token error
      WXP.showToast({
        icon: "none",
        title: response.data.msg,
        duration: 2000,
      })
      wx.navigateTo({
        url: "/pages/login/main"
      })
      return promise.reject(response.data)
    } else {
      // fail
      WXP.showToast({
        icon: "none",
        title: response.data.msg,
        duration: 2000
      })
      return promise.reject(response.data)
    }
    
  },
  (err, promise) => {
    wx.hideLoading();
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
