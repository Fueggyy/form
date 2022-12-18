export const state = () => ({
  accessToken: null,
  refreshToken: null,
  fullname: null,
})

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
}

export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.$post(
      'http://127.0.0.1:3000/login',
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
