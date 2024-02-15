// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  alias: {
    css: '/<rootDir>/assets/css',
  },

  components: [
    {
      path: '@/shared/icons',
      prefix: 'Icon'
    },

    '@/components'
  ],

  css: ['@/assets/css/main.css'],

  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', [
    '@nuxtjs/i18n', {
      vueI18n: '@/i18n'
    },
  ],
  '@nuxt/ui'],

  pinia: {
    storesDirs: ['./stores/**']
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  }
})
