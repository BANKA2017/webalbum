import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import '@/assets/main.css'
import {ScrollTo} from "./share/Tools"
import {store, key} from './store'
//import VueGtag from "vue-gtag-next";
//import { trackRouter } from 'vue-gtag-next'

//use @vueuse/head
import { createHead } from "@vueuse/head"
router.afterEach(() => {
  ScrollTo(0)
})
const app = createApp(App)
app.use(router).use(createHead()).use(store, key)
//if (process.env.NODE_ENV !== 'development') {
//  app.use(VueGtag, {
//    property: [
//      {id: import.meta.env.VITE_GA_ID},
//    ]
//  });
//  trackRouter(router);
//}
router.isReady().then(() => app.mount('#app'))
