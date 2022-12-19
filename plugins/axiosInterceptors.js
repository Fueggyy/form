export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }
  })

  $axios.onResponseError(async (error) => {
    try {
      // && error.response.data.message === 'ACCESS_TOKEN_EXPIRED'
      if (error.response.status === 401) {
        let refreshToken = store.state.auth.refreshToken

        const response = await $axios.$post('/refresh-token', {
          refreshToken: refreshToken,
        })

        store.commit('auth/setAccessToken', response.accessToken)
        store.commit('auth/setRefreshToken', response.refreshToken)

        let originalRequest = error.config
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${response.accessToken}`

        return $axios.request(originalRequest)
      }
    } catch (error) {
      return redirect('/logout')
    }
  })
}
