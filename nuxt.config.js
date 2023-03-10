require('dotenv').config({ path: './config/.env' });

export default {
  ssr: false,
  target: 'static',
  srcDir: 'src/',
  dir: {
    pages: 'ui/pages',
    components: 'ui/core/components',
    assets: 'ui/core/assets',
    layouts: 'ui/core/layouts'
  },
  head: {
    title: 'simple-crud',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [],

  plugins: ['~/ui/core/plugins/vee-validate'],

  components: [{ path: '~/ui/core/components', extensions: ['vue'] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: './config' }]
  ],

  axios: {
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules']
  }
};
