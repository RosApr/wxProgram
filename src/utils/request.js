import wx from './wx'
import Fly from 'flyio'
const qs = require("qs")
const baseUrl = "https://demo.xinbao369.com/ids/public/index.php/api/"
const request = new Fly()

request.config.baseURL = baseUrl
request.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中' //数据请求前loading
  })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading();
    return promise.resolve(response.data)
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
