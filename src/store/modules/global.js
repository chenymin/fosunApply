import * as types from '../mutation-types'
import xinyuLoan from '../../utils/config/xingyuloan'
import houseFinance from '../../utils/config/housefinance'
import productList from '../../utils/config/productlist'

const state = {
  currentData: '',
  pageSource: {
    '02': xinyuLoan,
    '01': houseFinance
  },
  productList,
  toast: {
    title: '',
    content: ''
  },
  statusText: [
    '审批中',
    '审批通过',
    '审批拒绝',
    '还款中',
    '已结清'
  ]
}

const getters = {
  currentData: state => state.currentData,
  productListData: state => state.productList,
  toast: state => state.toast,
  statusText: state => state.statusText,
  pageSource: state => state.pageSource
}

const actions = {
}

const mutations = {
  [types.GET_CURRENT_DATA] ({pageSource}, {type}) {
    state.currentData = pageSource[type]
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
