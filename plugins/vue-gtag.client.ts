import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (process.env.NODE_ENV !== 'development') {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.NUXT_GA_ID
      }
    })
  }
})