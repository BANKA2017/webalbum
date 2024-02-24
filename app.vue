<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {useMainStore} from "~/stores/main";
import type {ApiUserInfo} from "~/type/Api";
import {switchDarkMode, switchDarkModeAction} from "~/share/DarkMode";

useHead({
  charset: 'utf-8',
  htmlAttrs: {
    lang: "en"
  },
  title: 'Game Album',
  keywords: 'Nintendo Switch Album, Playstation Album, Twitter Album',
  description: 'An Online Album for Sharing and Downloading Screenshots and Videos from NS/PS/Xbox'
})

const config = useRuntimeConfig()
const store = useMainStore()
const basePath = config.public.NUXT_BASE_PATH
const platform = computed(() => store.platform)
const screenName = computed(() => store.screen_name)
const darkMode = computed(() => store.dark)

onMounted(() => {
  //get data from storage
  if (localStorage.darkMode) {
    store.updateCoreValue('dark', localStorage.darkMode)
    switchDarkModeAction(darkMode.value)
  } else {
    store.updateCoreValue('dark', switchDarkMode('2'))
  }

  if (localStorage.screen_name) {
    store.updateCoreValue('screen_name', localStorage.screen_name)
  }
  if (localStorage.hashtags_count) {
    let tmpCount = Number(localStorage.hashtags_count)
    store.updateCoreValue('hashtags_count', tmpCount ? tmpCount : 20 )
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