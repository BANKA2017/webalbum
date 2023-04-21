<template>
  <div class="my-5 grid grid-cols-1 md:grid-cols-3">
    <div class="col-span-1 w-full md:border-r-4 md:border-r-transparent mb-5" >
      <!--<p class="bg-black dark:bg-white text-3xl px-5 py-2 text-white dark:text-black">SETTINGS</p>-->
      <!--<p :class="{'text-2xl': true, 'px-5': true, 'py-2': true, 'text-white': true, 'hover:bg-slate-800': true, 'border-4': true, 'border-transparent': true, 'hover:text-teal-300': true, 'cursor-pointer': true, 'select-none': true, 'text-teal-300': state.page === key, 'bg-slate-800': state.page === key, 'border-cyan-500': state.page === key}" v-for="(value, key) in SettingsList" :key="key" @click="state.page = key">
        {{ value }}</p>-->
      <div :class="{'text-2xl': true, 'px-5': true, 'py-2': true, 'border-4': true, 'cursor-pointer': true, 'select-none': true, 'hover:bg-slate-100': true, 'border-[#E60012]': Platform === 'ns', 'border-[#0070D1]': Platform === 'ps', 'border-[#107C10]': Platform === 'xbox'}">Accounts</div>
    </div>
    <div class="md:col-start-2 md:col-span-2 w-full md:border-l-4 md:border-l-transparent px-0 md:px-10">
      <div class="grid grid-cols-10">
        <div class="col-span-2 px-0 sm:px-2 md:px-0 xl:px-5">
          <div v-if="!userInfo.avatar" class="aspect-square w-full bg-slate-300 animate-pulse rounded-xl"/>
          <img v-else class="aspect-square w-full bg-slate-300 rounded-xl" :src="mediaPath + userInfo.avatar" :alt="userInfo.display_name" />
        </div>
        <div class="col-span-8 px-5 divide-gray-900 flex flex-col justify-between">
          <div v-if="!state.editMode">
            <div class="flex justify-between items-center">
              <span v-if="screenName" :class="{'text-2xl': true, 'animate-pulse': !userInfo.display_name, 'bg-slate-300': !userInfo.display_name, 'h-6': !userInfo.screen_name, 'w-32': !userInfo.display_name, 'rounded-xl': !userInfo.display_name, }">{{ userInfo.display_name ? userInfo.display_name : '' }}</span>
              <span v-else class="text-2xl ">Twitter username</span>
              <div class="cursor-pointer hover:bg-slate-200 p-3 rounded-full" @click="state.editMode = !state.editMode">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </div>
            </div>
            <div v-if="screenName" :class="{'text-sm': true, 'animate-pulse': !userInfo.screen_name, 'bg-slate-300': !userInfo.screen_name, 'h-5': !userInfo.screen_name, 'w-15': !userInfo.screen_name, 'rounded-xl': !userInfo.display_name, }">{{ userInfo.screen_name ? '@' + userInfo.screen_name : '' }}</div>
          </div>
          <div v-else class="items-center gap-2 flex">
            <div class="basis-10/12">
              <input id="input-screen-name" type="text" class="form-input w-full rounded-xl h-[2em] md:h-[2.5em]" v-model="screenName" placeholder="Screen Name">
            </div>
            <div class="cursor-pointer hover:bg-gray-200 p-2 rounded-full" @click="screenName = ''">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-x-lg w-[1em] md:w-[1.5em]" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
            <div class="cursor-pointer hover:bg-gray-200 p-2 rounded-full" @click="state.editMode = !state.editMode">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-check2 w-[1em] md:w-[1.5em]" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-5 2xl:mt-0">
            <div @click="setPlatform('ns')" :class="{'col-span-3': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#E60012]': Platform === 'ns', 'text-white': Platform === 'ns', 'border-2': true, 'border-[#E60012]': Platform !== 'ns',}">Nintendo Switch</div>
            <div @click="setPlatform('ps')" :class="{'col-span-3': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#0070D1]': Platform === 'ps', 'text-white': Platform === 'ps', 'border-2': true, 'border-[#0070D1]': Platform !== 'ps',}">PlayStation</div>
            <div @click="setPlatform('xbox')" :class="{'col-span-3': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#107C10]': Platform === 'xbox', 'text-white': Platform === 'xbox', 'border-2': true, 'border-[#107C10]': Platform !== 'xbox',}">Xbox</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMainStore} from "~/stores/main";
import {ApiUserInfo} from "~/type/Api";

useHead({
  title: 'Settings'
})

const SettingsList = {
  user: 'Account',
  //layout: 'Layout',
  //tools: 'Tools',
}

const state = reactive<{
  page: string
  editMode: boolean
}>({
  page: 'user',
  editMode: false
})

const config = useRuntimeConfig()
const store = useMainStore()
const userInfo = computed(() => store.userInfo)
const basePath = config.public.NUXT_BASE_PATH
const mediaPath = config.public.NUXT_MEDIA_PATH

const screenName = computed({
  get () {return store.screen_name},
  set (value: string) {
    store.updateCoreValue('screen_name', value)
    localStorage.screen_name = value
    store.updateCoreValue('tweets', [])
  }
})

const Platform = computed(() => store.platform)

const setPlatform = (platform: 'ns' | 'ps' | 'xbox') => {
  localStorage.platform = platform
  store.updateCoreValue('platform', platform)
  store.updateCoreValue('tweets', [])
}

watch(() => state.editMode, () => {
  if (screenName.value === '' || state.editMode) {return}
  store.updateCoreValue('userInfo', {
    uid: '0',
    screen_name: '',
    display_name: '',
    avatar: '',
  })

  useFetch<ApiUserInfo>("/data/userinfo/?name=" + screenName.value, {baseURL: basePath}).then(response => {
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
      store.updateCoreValue('tweets', [])
    }
  }).catch(e => {
    console.error(e)
  })
})

definePageMeta({
  layout: "web-album",
})
</script>

<style scoped>

</style>