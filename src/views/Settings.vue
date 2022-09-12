<template>
  <div class="my-5 grid grid-cols-1 md:grid-cols-3">
    <div class="col-span-1 w-full md:border-r-4 md:border-r-transparent mb-5" >
      <!--<p class="bg-black dark:bg-white text-3xl px-5 py-2 text-white dark:text-black">SETTINGS</p>-->
      <!--<p :class="{'text-2xl': true, 'px-5': true, 'py-2': true, 'text-white': true, 'hover:bg-slate-800': true, 'border-4': true, 'border-transparent': true, 'hover:text-teal-300': true, 'cursor-pointer': true, 'select-none': true, 'text-teal-300': state.page === key, 'bg-slate-800': state.page === key, 'border-cyan-500': state.page === key}" v-for="(value, key) in SettingsList" :key="key" @click="state.page = key">
        {{ value }}</p>-->
      <p class="text-2xl px-5 py-2 border-4 border-cyan-500 cursor-pointer select-none hover:bg-slate-100">Account</p>
    </div>
    <div class="md:col-start-2 md:col-span-2 w-full md:border-l-4 md:border-l-transparent px-0 md:px-10">
      <div class="grid grid-cols-10">
        <div class="col-start-1 col-span-4 px-0 sm:px-2 md:px-0 xl:px-5">
          <img class="aspect-square w-full bg-slate-500" :src="mediaPath + userInfo.avatar" :alt="userInfo.display_name" />
        </div>
        <div class="col-start-5 col-span-7 p-5 divide-gray-900">
          <div v-if="!state.editMode">
            <div class="flex justify-between items-center mb-2">
              <span v-if="screenName" :class="{'text-2xl': true, 'animate-pulse': !userInfo.display_name, 'bg-slate-300': !userInfo.display_name, 'h-8': !userInfo.screen_name, 'w-32': !userInfo.display_name,}">{{ userInfo.display_name ? userInfo.display_name : '' }}</span>
              <span v-else class="text-2xl ">请填写推特用户名</span>
              <span class="cursor-pointer hover:bg-slate-200 " @click="state.editMode = !state.editMode">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </span>
            </div>
            <p v-if="screenName" :class="{'text-sm': true, 'animate-pulse': !userInfo.screen_name, 'bg-slate-300': !userInfo.screen_name, 'h-5': !userInfo.screen_name, 'w-15': !userInfo.screen_name,}">{{ userInfo.screen_name ? '@' + userInfo.screen_name : '' }}</p>
          </div>
          <div v-else class="grid grid-cols-12 items-center ">
            <div class="col-span-12"><label class="font-bold" for="input-screen-name">Screen Name</label></div>
            <div class="col-start-1 col-span-11 ">
              <input id="input-screen-name" type="text" class="form-input w-full" v-model="screenName">
            </div>
            <span class="cursor-pointer col-start-12 ml-2 hover:text-gray-700" @click="state.editMode = !state.editMode">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </span>
          </div>
          <hr class="my-5">
          <label class="font-bold mb-3">Platform</label>
          <div class="grid grid-cols-2 gap-2">
            <div @click="setPlatform('ns')" :class="{'col-span-2': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#E60012]': Platform === 'ns', 'text-white': Platform === 'ns', 'border-2': true, 'border-[#E60012]': Platform === 'ps',}">Nintendo Switch</div>
            <div @click="setPlatform('ps')" :class="{'col-span-2': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#0070D1]': Platform === 'ps', 'text-white': Platform === 'ps', 'border-2': true, 'border-[#0070D1]': Platform === 'ns',}">PlayStation</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive, Ref, watch} from "vue"
import {useHead} from "@vueuse/head"
import {useStore} from "@/store";
import {computed, ref} from "vue";
import {request} from "@/share/Fetch";
import {ApiUserInfo} from "@/type/Api";
//useHead(headData('归档 - ' + metaData.name, "查看摸鱼记录"))

const SettingsList = {
  user: '用户',
  //layout: '布局',
  //tools: '工具',
}

const state = reactive<{
  page: Ref<string>
  editMode: Ref<boolean>
}>({
  page: ref('user'),
  editMode: ref(false)
})
const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const basePath = computed(() => store.state.basePath)
const mediaPath = computed(() => store.state.mediaPath)

const screenName = computed({
  get () {return store.state.screen_name},
  set (value: string) {
    store.dispatch('setCoreValue', {key: 'screen_name', value})
    localStorage.screen_name = value
    store.dispatch('setCoreValue', {key: 'tweets', value: []})
  }
})

const Platform = computed(() => store.state.platform)

const setPlatform = (platform: 'ns' | 'ps') => {
  localStorage.platform = platform
  store.dispatch('setCoreValue', {key: 'platform', value: platform})
}

watch(screenName, () => {
  if (screenName.value === '') {return}
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
    store.dispatch('setCoreValue', {key: 'tweets', value: []} )
  }).catch(e => {
    console.error(e)
  })
})

</script>
