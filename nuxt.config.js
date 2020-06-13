import settings from './base.config'

export default {
  server: {
    port: settings.port,
    host: settings.host,
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '%s' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      {name: 'viewport', content: 'width=1200, initial-scale=1'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        crossorigin: "anonymous",
        src: 'https://polyfill.io/v3/polyfill.min.js?flags=gated&features=Array.prototype.forEach%2CElement.prototype.before%2CNodeList.prototype.forEach%2CHTMLPictureElement%2CElement.prototype.closest%2CObject.getOwnPropertyNames%2CElement.prototype.classList%2Ces6%2Ces5',
        body: true
      },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {src: '~assets/scss/app.scss', lang: 'scss'},
  ],
  styleResources: {
    scss: [
      'assets/scss/vars.scss',
      'assets/scss/mixins.scss',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/affix', ssr: false
    },
    {
      src: '~/plugins/datePicker', ssr: false
    },
    {
      src: '~/plugins/textMask', ssr: false
    },
    {
      src: '~/plugins/swiper', ssr: false
    },
    '~/plugins/vClickOutside',
    '~/plugins/vtooltip',
    '~/plugins/numberFormat',
    '~/plugins/v-autosize',
    '~/plugins/numberFormat',
    '~/plugins/vue-js-modal',
    '~/plugins/mixins/user',
    '~/plugins/axios',
    '~/plugins/debounce',
    '~/plugins/moment',
    '~/plugins/customPlugins',
    '~/plugins/multiselect',
    '~/plugins/declOfNum',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['vue-scrollto/nuxt', {duration: 400}],
  ],
  axios: {
    baseURL: settings.baseURL,
  },
  auth: {
    strategies: {
      custom: {
        _scheme: '~/plugins/localAuthStrategy.js',
        endpoints: {
          login: {url: 'auth/login', method: 'post', propertyName: 'token'},
          user: {url: 'auth/me', method: 'get', propertyName: false},
          logout: {url: 'auth/logout', method: 'post'}
        }
      }
    },
    defaultStrategy: 'custom',
    redirect: {
      login: '/',
      logout: '/',
      callback: false,
      home: false
    }
  },

  // extractCSS: true,
  // cache: true,
  // "html.minify": {
  //   collapseBooleanAttributes: true,
  //   decodeEntities: true,
  //   minifyCSS: true,
  //   minifyJS: true,
  //   processConditionalComments: true,
  //   removeEmptyAttributes: true,
  //   removeRedundantAttributes: true,
  //   trimCustomFragments: true,
  //   useShortDoctype: true
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

// Устраняем проблему с сертификатом
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
