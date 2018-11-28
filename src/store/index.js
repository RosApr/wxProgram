import Vue from "vue"
import Vuex from "vuex"
import { getIndexList, getDetail, getFilters, getSearchList, getPublishList, deletePublishApi } from "@/utils/api"
import { INDEX_PAGE_LIST_TYPE, transformTitle } from "@/utils/common"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    indexConfig: {
      list: [],
      page: 1,
      size: 8,
      total: 999999,
      activeTab: INDEX_PAGE_LIST_TYPE["sell"]
    },
    detail: {},
    // 我的发布
    publishConfig: {
      list: [],
      page: 1,
      size: 8,
      total: 999999
    },
    filter: {
      category: "",
      model: "",
      stock: "",
      factory: "",
      price: "",
      min: "",
      max: "",
    },
    filterTransform: {
      transferType: "",
      startdate: "",
      cityStart: "",
      cityEnd: "",
      type: ""
    },
    filtersConfig: {
      category: [],
      model: [],
      stock: [],
      factory: [],
      transport: [],
      vehicletype: []
    },
    //搜索
    searchConfig: {
      search: "",
      list: [],
      page: 1,
      size: 8,
      total: 999999
    }
  },
  mutations: {
    saveSearchData(state, params) {
      if(params["search"]) {
        state.searchConfig = {
          list: [],
          page: 1,
          size: 8,
          total: 99999999999,
          ...params
        }
      }else {
        state.searchConfig = {
          ...state.searchConfig,
          ...params
        }
      }
    },
    savePublishData(state, payload) {
      state.publishConfig = {
        ...state.publishConfig,
        ...payload
      }
    },
    saveIndexConfig(state, payload) {
      state.indexConfig = {
        ...state.indexConfig,
        ...payload
      }
    },
    saveDetailData(state, payload) {
      state.detail = payload
    },
    saveFilters(state, payload) {
      state.filtersConfig = payload
    }
  },
  actions: {
    async queryPublishList({ state, commit }, payload={}) {
      if(payload["refresh"]) {
        commit("savePublishData", {
          list: [],
          page: 1,
          size: 8,
          total: 999999
        })
      }
      const { publishConfig: {page, size, total} } = state
      if(state.publishConfig.list.length < total) {
        const response = await getPublishList({
          page,
          size
        })
        const nextPage = response.data.data.length === 0 ? state.publishConfig.page : ++state.publishConfig.page
        const list = state.publishConfig.list.concat(response.data.data.map(item => {
          item["typeFormat"] = transformTitle(item.type)
          return item
        }))
        commit("savePublishData", {
          list: list,
          total: response.data.total,
          page: nextPage
        })
      }
    },
    async deletePublish({ state, commit }, payload={}) {
      const deleteRes = await deletePublishApi(payload)
      if(deleteRes.code == 1) {
        store.dispatch("queryPublishList", {refresh: true})
      }
    },
    async querySearchList({ state, commit }, payload={}) {
      commit("saveSearchData", payload)
      const { size, page, search } = state.searchConfig
      if(state.searchConfig.list.length >= state.searchConfig.total) {
        return false
      }
      const response = await getSearchList({size, page, search})
      const nextPage = response.data.data.length === 0 ? state.searchConfig.page : ++state.searchConfig.page
      const list = state.searchConfig.list.concat(response.data.data.map(item => {
        item["typeFormat"] = transformTitle(item.type)
        return item
      }))
      commit("saveSearchData", {
        page: nextPage,
        list: list,
        total: response.data.total
      })
    },
    async queryFilters({ state, commit }) {
      const { data } = await getFilters()
      data.stock = [...[""], ...data.stock]
      data.category = [...[""], ...data.category]
      data.model = [...[""], ...data.model]
      data.factory = [...[""], ...data.factory]
      data.vehicletype = [...[""], ...data.vehicletype]
      commit("saveFilters", data)
    },
    async queryIndexList({ state, commit }, { listType, region }) {
      // 切换tab重置列表请求参数
      if(state.indexConfig.activeTab != listType) {
        commit("saveIndexConfig", {
          page: 1,
          size: 8,
          list: [],
          total: 99999999999999,
          activeTab: listType
        })
      }
      if(region) {
        commit("saveIndexConfig", {
          page: 1,
          size: 8,
          list: [],
          total: 99999999999999,
          activeTab: listType
        })
      }
      // 判断数据是否全部得到
      if(state.indexConfig.list.length < state.indexConfig.total) {
        const response = await getIndexList({
          page: state.indexConfig.page,
          size: state.indexConfig.size,
          listType: listType
        })
        const nextPage = response.data.rows.length === 0 ? state.indexConfig.page : ++state.indexConfig.page
        const list = state.indexConfig.list.concat(response.data.rows)
        commit("saveIndexConfig", {
          list: list,
          total: response.data.total,
          page: nextPage
        })
      }
    },
    async getDetail({ state, commit },  payload) {
      const response = await getDetail(payload)
      commit("saveDetailData", response.data)
    }
  }
})

export default store