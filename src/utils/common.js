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
export {
    setWxNavBarTitle,
    INDEX_PAGE_LIST_TYPE
}