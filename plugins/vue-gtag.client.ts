import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const NUXT_GA_ID = process.env.NUXT_GA_ID || ''
  if (process.env.NODE_ENV !== 'development') {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: NUXT_GA_ID
      }
    })
  }
})