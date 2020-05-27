require('dotenv').config()
const { BASE_URL, API_URL, APP_NAME, APP_DESC } = process.env

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: APP_NAME,
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: APP_DESC
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: APP_NAME
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: APP_NAME
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: BASE_URL + '/'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: APP_DESC
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: BASE_URL + '/icon.png'
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'ja_JP'
      },
      {
        hid: 'apple-mobile-web-app-status-bar-style',
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      },
      {
        hid: 'author',
        name: 'author',
        content: APP_NAME
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'max-image-preview:large'
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#000000'
      },
      {
        hid: 'msapplication-TileImage',
        name: 'msapplication-TileImage',
        content: BASE_URL + '/icon.png'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: BASE_URL + '/favicon.ico'
      }
    ],
    script: [{ src: '//js.pay.jp/v2/pay.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/reset.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/localStorage.js', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    BASE_URL,
    API_URL,
    APP_NAME,
    APP_DESC
  }
}
