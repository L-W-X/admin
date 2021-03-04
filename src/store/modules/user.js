import { login, logout, getInfo, permission } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router'
import Vue from 'vue'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    permissionRouter: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION_ROUTER: (state, val) => {
    state.permissionRouter = [...constantRoutes, ...val]
  }
}

const actions = {
  // 获取权限数组
  async getPermission({ commit }) {
    try {
      const result = await permission()
      commit('SET_PERMISSION_ROUTER', result.data.permission)
      return Promise.resolve(result.data.permission)
    } catch (error) {
      console.log(error)
      Vue.$message({
        message: '权限请求失败',
        type: 'error'
      })
      return Promise.reject()
    }
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

