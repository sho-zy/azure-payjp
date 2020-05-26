require('dotenv').config()
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.APP_NAME,
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
        content: process.env.APP_DESC
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: process.env.APP_NAME
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: process.env.APP_NAME
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL + '/'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: process.env.APP_DESC
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.BASE_URL + '/icon.png'
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
        content: process.env.APP_NAME
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
        content: process.env.BASE_URL + '/icon.png'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: process.env.BASE_URL + '/favicon.ico'
      }
    ]
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
  plugins: [
    { src: '~/plugins/localStorage.js', mode: 'client' },
    { src: '~/plugins/payjp.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
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
  }
}
