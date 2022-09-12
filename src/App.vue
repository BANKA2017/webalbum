<template>
  <div id="app">
    <div class="min-h-screen">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-start-1 col-span-12 md:col-start-2 md:col-span-10">
          <div class="mx-4 md:mx-1">
            <main-title />
            <router-view />
            <Footer />
          </div>
        </div>
      </div>
      <loading />
      <div :class="{'fixed': true, 'right-5': true, 'bottom-20': true, 'px-3': true, 'py-2': true, 'cursor-pointer': true, 'border-2': true, 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps', 'transition-colors': true, 'duration-150': true, 'select-none': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'text-white': true}" style="z-index: 9999" @click="ScrollTo()">
        Top
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
import {useStore} from "@/store";
import MainTitle from "@/components/MainTitle.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
import {computed} from "vue";
import {request} from "@/share/Fetch";
import {ApiUserInfo} from "@/type/Api";
import {ScrollTo} from "@/share/Tools"

const route = useRoute()
const store = useStore()
const basePath = computed(() => store.state.basePath)
const platform = computed(() => store.state.platform)

if (localStorage.screen_name) {
  store.dispatch('setCoreValue', {key: 'screen_name', value: localStorage.screen_name})
}

store.dispatch('updatePlatform', localStorage.platform === 'ps' ? 'ps' : 'ns')

const screenName = computed(() => store.state.screen_name)
if (screenName.value) {
  request<ApiUserInfo>(basePath.value + "/api/v2/data/userinfo/?name=" + screenName.value).then(response => {
    if (response.code === 200) {
      store.dispatch('setCoreValue', {key: 'status', value: 2})
    }
    store.dispatch('setCoreValue', {key: 'userInfo', value: {
        uid: response.data.uid,
        screen_name: response.data.name,
        display_name: response.data.display_name,
        avatar: response.data.header,
      }})
  }).catch(e => {
    console.error(e)
  })
}

//onBeforeMount(() => {
//  store.getPlatformFromLocalStorage()
//  store.getScreenNameFromLocalStorage()
//})

</script>
