<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {useMainStore} from "~/stores/main";
import {ApiUserInfo} from "~/type/Api";

useHead({
  charset: 'utf-8',
  htmlAttrs: {
    lang: "zh"
  },
  title: 'Web Album',
  keywords: 'Nintendo Switch Album, Playstation Album, Twitter Album',
  description: 'Web Album'
})

const config = useRuntimeConfig()
const store = useMainStore()
const basePath = config.public.NUXT_BASE_PATH
const platform = computed(() => store.platform)
const screenName = computed(() => store.screen_name)

onMounted(() => {
  if (localStorage.screen_name) {
    store.updateCoreValue('screen_name', localStorage.screen_name)
  }

  store.updateCoreValue('platform', ['ns', 'ps', 'xbox'].includes(localStorage.platform) ? localStorage.platform : 'ns')

  if (screenName.value) {
    useFetch<ApiUserInfo>('/data/userinfo/?name=' + screenName.value, {baseURL: basePath}).then(response => {
      if (response.data.value !== null) {
        if (response.data.value.code === 200) {
          store.updateCoreValue('status', 2)
        }
        store.updateCoreValue('userInfo', {
          uid: response.data.value.data.uid,
          screen_name: response.data.value.data.name,
          display_name: response.data.value.data.display_name,
          avatar: response.data.value.data.header,
        })
      }
    }).catch(e => {
      console.error(e)
    })
  }
})
</script>

<style scoped>

</style>