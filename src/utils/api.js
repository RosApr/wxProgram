import request from "./request"
import { INDEX_PAGE_LIST_TYPE } from "@/utils/common"
const login = (params) => {
    return request.post("/user/login", params)
}
const getIndexList = (params) => {
    const { listType, ...pagination } = params
    return request.get(`/common/${params.listType}`, pagination)
}
const getPhoneVerifyCode = (params) => {
    return request.post("/message/sms", params)
}
const execVerifyCode = (params) => {
    return request.post("/message/verify", params)
}
const resetPwd = (params) => {
    return request.post("/user/reset", params)
}
const register = (params) => {
    return request.post("/user/register", params)
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
const deletePublishApi = (params) => {
    let path = ""
    switch(params.type) {
        case INDEX_PAGE_LIST_TYPE.logistics:
            path = "logistics"
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
    return request.post(`/${path}/delete`, {
        id: params.id
    })
}
const getFilters = () => {
    return request.get("/common/filter", null)
}
const getPublishList = (params) => {
    return request.get("/user/my", params)
}
const publishApi = (params) => {
    const { publishType, id, ...formData } = params
    if(id) {
        formData["id"] = id
    }
    return request.post(`/${publishType}/${id ? "edit" : "publish" }`, formData)
}
const reportPublish = (params) => {
    return request.post("/report/index", params)
}
const modifyUserProfile = (params) => {
    return request.post("/user/edit", params)
}
const getUserProfile = (params) => {
    return request.post("/user/profile", params)
}
const getUserLoginInfo = (params) => {
    return request.post("/user/wechat", params)
}
const uploadImgUrl = "https://m.91lzht.com/ids/public/index.php/api/material/upload"
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
    reportPublish,
    // 登录
    login,
    // 获取验证码
    getPhoneVerifyCode,
    // 校验验证码
    execVerifyCode,
    // 重置密码
    resetPwd,
    // 注册
    register,
    // 获取登录信息
    getUserLoginInfo,
    // 修改用户信息
    modifyUserProfile,
    // 删除已发布
    deletePublishApi,
    // 获取用户信息
    getUserProfile
}