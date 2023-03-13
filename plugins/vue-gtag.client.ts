import VueGtag, {trackRouter} from 'vue-gtag-next'
import {useRouter} from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (process.env.NODE_ENV !== 'development') {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.public.NUXT_GA_ID
      }
    })
    trackRouter(useRouter())
  }
})