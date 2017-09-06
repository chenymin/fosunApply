import * as types from '../mutation-types'
import {setStore, removeStore} from '../../utils/storage'
import {userLogin, userInfo, userVerify, sendSMSMsg} from '../../api/user'
import _ from 'lodash'

const state = {
  userInfo: {},
  smsCode: {}
}

const getters = {
  userInfo: state => state.userInfo,
  smsCode: state => state.smsCode
}

const actions = {
  async login ({commit}, {param, router, redirect}) {
    const {data} = await userLogin(param)
    const {mobile} = param
    commit(types.USER_LOGIN, {data, mobile})
    return await data
  },
  async getUserInfo ({commit}) {
    const {data} = await userInfo()
    commit(types.GET_USER_INFO, {data})
    return await data
  },
  baseInfoVerify ({commit}, {param, router}) {
    console.log(param)
    userVerify(param).then(({data}) => {
      // TODO 验证未通过弹框
      const {code} = data
      if (code === 'error') {
        return
      }
      router.push({
        name: 'applyinfo'
      })
      console.log('userVerify')
    })
  },

  async sendSmsCode ({commit}, {param}) {
    const {data} = await sendSMSMsg(param)
    commit(types.SEND_SMS_CODE, {data})
    return await data
  },

  removeToken () {
    removeStore('token')
  }
}

const mutations = {
  [types.USER_LOGIN] (state, {data, mobile}) {
    const {userId, token} = data
    setStore('token', token)
    setStore('mobile', mobile)
    state.userInfo = data
    console.log(token + ' ' + userId)
  },

  [types.GET_USER_INFO] (state, {data}) {
    let {name, idNo, bankCard, bankMobile} = data
    bankMobile = bankMobile || ''
    _.assign(state.userInfo, {name, idNo, bankCard, bankMobile})
  },
  [types.SEND_SMS_CODE] (state, {data}) {
    const {verifyCodeCount} = data
    setStore('verifyCodeCount', verifyCodeCount)
    _.assign(state.smsCode, {verifyCodeCount})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
