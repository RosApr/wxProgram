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
    return request.get("/user/my", {
        ...params,
        token
    })
}
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
    getPublishList
}