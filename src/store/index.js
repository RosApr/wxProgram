import Vue from "vue"
import Vuex from "vuex"
import { getIndexList, getDetail } from "@/utils/api"
import { INDEX_PAGE_LIST_TYPE } from "@/utils/common"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    indexConfig: {
      list: [],
      current: 1,
      size: 8,
      total: 99999999999999,
      activeTab: INDEX_PAGE_LIST_TYPE["sell"]
    },
    detail: {},
    pubulishList: []
  },
  mutations: {
    saveListParams(state, payload) {
      state.indexConfig = {
        ...state.indexConfig,
        ...payload
      }
    },
    saveDetailData(state, payload) {
      state.detail = payload
    }
  },
  actions: {
    async getIndexList({ state, commit }, { listType }) {
      // 切换tab重置列表请求参数
      if(state.indexConfig.activeTab != listType) {
        commit("saveListParams", {
          current: 1,
          size: 8,
          list: [],
          total: 99999999999999,
          activeTab: listType
        })
      }
      // 判断数据是否全部得到
      if(state.indexConfig.list.length < state.indexConfig.total) {
        const response = await getIndexList({
          page: state.indexConfig.current,
          size: state.indexConfig.size,
          listType: listType
        })
        const list = state.indexConfig.list.concat(response.data.rows)
        commit("saveListParams", {
          list: list,
          total: response.data.total,
          current: ++state.indexConfig.current
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