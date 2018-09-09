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
const getFilters = () => {
    return request.get("/common/filter", null)
}
const getPublishList = (params) => {
    return request.get("/user/my", params)
}
const publishApi = (params) => {
    const { publishType, ...formData } = params
    return request.post(`/${publishType}/publish`, formData)
}
const reportPublish = (params) => {
    return request.post("/report/index", params)
}
const modifyUserProfile = (params) => {
    return request.post("/user/edit", params)
}
const getUserLoginInfo = (params) => {
    const isLogin = Math.round(Math.random())
    const userInfo = { openId: "test" }
    // let data = !!isLogin ? {
    let data = true ? {
        ...userInfo,
        token: "9b28563b51735082b174d2f0850e4227",
        "id": 12,
        "nickname": "test",
        "phone": "18089210182",
        "realname": "12345678",
        "images": ["https:\/\/demo.xinbao369.com\/ids\/public\/\/upload\/20180909\/a8d2a55a3057809a3bf416dd4c4d3e4b.png"],
        "account": null,
        "headimg": null,
        "createtime": "2018-09-09 14:11:42",
        "checked": 0,
        "status": 1,
        "enable": 0
    } : userInfo
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 1,
                data
            })
        }, 1000)
    })
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
    modifyUserProfile
}