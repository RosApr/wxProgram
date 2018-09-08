import request from "./request"
import { INDEX_PAGE_LIST_TYPE } from "@/utils/common"
const login = (params) => {
    var formData = new FormData();
    for(let [key, value] of Object.entries(params)) {
        formData.append(key, value);
    }
    formData.append("type", "login");
    return request.post("/user/login", formData)
}
const getIndexList = (params) => {
    const { listType, ...pagination } = params
    return request.get(`/common/${params.listType}`, pagination)
}
const getDetail = (params) => {
    let path = ""
    switch(params.type) {
        case INDEX_PAGE_LIST_TYPE.logistics:
            path = "Logistics"
            break
        case INDEX_PAGE_LIST_TYPE.sell:
            path = "sell"
            break
        case INDEX_PAGE_LIST_TYPE.buy:
            path = "buy"
            break
    }
    if(!path) {
        return false
    }
    return request.get(`/common/${path}/details/1"`, {
        id: params.id
    })
}
const getSearchList = (params) => {
    return request.get("/common/search", params)
}
const getFilters = () => {
    return request.get("/common/filter", null)
}
const getPublishList = (params) => {
    const token = wx.getStorageSync("TOKEN")
    if(!token) {
        console.log("token丢失")
        return false        
    }
    const data = {
        ...params,
        token
    }
    return request.get("/user/my", data)
}
const publishApi = (params) => {
    const token = wx.getStorageSync("TOKEN")
    if(!token) {
        console.log("token丢失")
        return false        
    }
    const { publishType, ...formData } = params
    formData["token"] = token
    return request.post(`${publishType}/publish`, formData)
}
const reportPublish = (params) => {
    return request.post("/report/index", params)
}
const uploadImgUrl = "https://demo.xinbao369.com/ids/public/index.php/api/material/upload"
export {
    // 首页列表
    getIndexList,
    // 详情
    getDetail,
    //获取筛选条件
    getFilters,
    // 搜索
    getSearchList,
    // 获取发布列表
    getPublishList,
    // 发布
    publishApi,
    // 上传图片地址
    uploadImgUrl,
    // 举报
    reportPublish
}