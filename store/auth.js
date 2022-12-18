export const state = () => ({
  accessToken: null,
  refreshToken: null,
  fullname: null,
})

export const getters = {
  authenticated(state) {
    // if (state.accessToken) {
    //   return true
    // }
    // return false
    return state.accessToken ? true : false
  },
}

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken
  },
  setFullname(state, fullname) {
    state.fullname = fullname
  },
  logout(state) {
    state.accessToken = null
    state.refreshToken = null
    state.fullname = null
  },
}

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.$post(
      '/login',
      payload
    )
    if (!response) {
      return false
    }
    commit('setAccessToken', response.accessToken)
    commit('setRefreshToken', response.refreshToken)
    commit('setFullname', response.fullname)

    return response
  },
}
