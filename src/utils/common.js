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
export {
    setWxNavBarTitle,
    INDEX_PAGE_LIST_TYPE,
    EXEC_REGULAR,
    USER_INFO
}
