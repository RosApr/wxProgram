import WXP from 'minapp-api-promise'

const TOKEN = "token"
const USER_PROFILE = "userProfile"
const OPEN_ID = "openid"
const REGION = "region"
const defaultCity = "北京市"
const openAjaxModel = ({ code = 1, title }, callback) => {
    return WXP.showToast({
        title,
        icon: code == 1 ? "success" : "none",
        duration: 2000
    }).then(() => {
        if(callback && typeof callback == "function") {
            callback()
        }
    })
}
const isInStorageAndReturn = (key) => {
    const data = {
        status: false
    }
    if(wx.getStorageInfoSync().keys.includes(key) && wx.getStorageSync(key) != "") {
        data["status"] = true
        data[key] = wx.getStorageSync(key)
    }
    return data
}
const queryUserLocationApi = ({longitude, latitude}) => {
    return WXP.request({url: 'https://api.map.baidu.com/geocoder/v2/?ak=1IZFuZ916LH41ocA5KzGFUDyK4EQB5Zp&location=' + latitude + ',' + longitude + '&output=json',
        data: {},
        header: {'Content-Type': 'application/json'}
    })
}
const saveLocationToStorage = ({city}) => {
    setDataToStorageIfIsAvailable(REGION, city)
}
const setWxNavBarTitle = (title) => {
    wx.setNavigationBarTitle({
        title: title
    })
}
const INDEX_PAGE_LIST_TYPE = {
    sell: "sell",
    buy : "buy",
    logistics: "logistics"
}
const EXEC_REGULAR = {
    phone: /^((1[3-8][0-9])+\d{8})$/,
    code: /^[0-9a-zA-Z]*$/,
    pwd: /^[0-9a-zA-Z]{6,8}$/
}
const transformTitle = (title) => {
    let titles = ""
    switch(title) {
        case INDEX_PAGE_LIST_TYPE["sell"]:
            titles = "供应"
            break
        case INDEX_PAGE_LIST_TYPE["buy"]:
            titles = "求购"
            break
        case INDEX_PAGE_LIST_TYPE["logistics"]:
            titles = "物流"
            break
        default:
            break
    }
    return titles
}
// 筛选
const filter = {
    category: "",
    model: "",
    stock: "",
    factory: "",
    price: "",
    min: "",
    max: "",
}
const filterTransform = {
    transferType: "",
    startdate: "",
    cityStart: "",
    cityEnd: "",
    type: ""
}
const modifyUserProfileSuccessCallback = (data) => {
    setDataToStorageIfIsAvailable(USER_PROFILE, data.data)
    wx.switchTab({
        url: "/pages/me/main"
    })
}
const setDataToStorageIfIsAvailable = (key, value) => {
    if(value){
        wx.setStorageSync(key, value)
        return true
    }
    return false
}
const taxConfig = [
    "不含税", "含税"
]
const transferCheckedTax = (tax) => {
    if(Number(tax)) {
        return taxConfig[tax]
    } else {
        return taxConfig.findIndex((value) => tax == value)
    }
}
export {
    setWxNavBarTitle,
    INDEX_PAGE_LIST_TYPE,
    EXEC_REGULAR,
    transformTitle,
    openAjaxModel,
    TOKEN,
    USER_PROFILE,
    OPEN_ID,
    modifyUserProfileSuccessCallback,
    REGION,
    queryUserLocationApi,
    saveLocationToStorage,
    defaultCity,
    isInStorageAndReturn,
    setDataToStorageIfIsAvailable,
    filter,
    filterTransform,
    taxConfig,
    transferCheckedTax
}
