import request from "./request"
const login = (params) => {
    console.log(params)
    var formData = new FormData();
    for(let [key, value] of Object.entries(params)) {
        formData.append(key, value);
    }
    formData.append("type", "login");
    return request.post("/user/login", formData)
}
const getIndexList = (params) => {
    console.log(params)
    const { listType, ...pagination } = params
    return request.get(`/common/${params.listType}`, pagination)
}
export {
    // 首页列表
    getIndexList
}