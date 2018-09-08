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

const USER_INFO = "USER_INFO"
const TOKEN = "5b8cd6e89265135acc3ac9f7f80663b3"
const transformTitle = (title) => {
    let titles = ""
    switch(title) {
        case INDEX_PAGE_LIST_TYPE["sell"]:
            titles = "厨具"
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
export {
    setWxNavBarTitle,
    INDEX_PAGE_LIST_TYPE,
    EXEC_REGULAR,
    USER_INFO,
    transformTitle,
    TOKEN
}
