import { loginAPI } from '@/api/user'
const state = {
  token: {}
}

const mutations = {
  GET_TOKEN(state, data) {
    state.token = data
  }
}

const actions = {
  async login({ commit }, userInfo) {
    const { data } = await loginAPI(userInfo)
    if (data.msg !== '登录成功') return
    commit('GET_TOKEN', data.token)
    console.log(data.msg)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

