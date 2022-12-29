import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  server: {
    port: 3001, // default: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - LuckQform',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.js', mode: 'client' },
    { src: '~/plugins/axiosInterceptors.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  // i18n: {
  //   langDir: 'lang/',
  //   defaultLocale: 'id',
  //   locales: [
  //     {
  //       code: 'id', // Indonesia
  //       iso: 'id-ID',
  //       name: 'Indonesia',
  //       file: 'id.json',
  //     },
  //   ],
  // },

  i18n: {
    langDir: 'lang/',
    defaultLocale: 'id',
    locales: [
      { code: 'id', name: 'Indonesia', iso: 'id-ID', file: 'id.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'ru', name: 'Russian', iso: 'ru-RU', file: 'ru.json' },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    // prefix: process.env.API_URL,
    prefix: 'https://nuxtapi.luckqmaks.com',
//     prefix: 'http://localhost:3000',
    proxy: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
