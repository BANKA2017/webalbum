<template>
  <div class="mt-4">
    <div class="flex items-center justify-between">
      <div class="text-4xl py-1 font-bold bg-clip-text">
        <router-link to="/" class="inline-block mr-2 ">Album</router-link>
        <span :class="{'select-none': true, 'text-white': true, 'px-2': true, 'rounded-2xl': true, 'text-sm': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps'}">{{ platform }}</span>
      </div>

      <div class="flex justify-end items-center">
        {{screen_name}}
        <router-link to="/settings" class="border-2 border-cyan-500 hover:bg-slate-100 px-3 py-1" v-if="!screen_name">
          Settings
        </router-link>
        <router-link to="/settings" class="ml-2 bg-slate-200 rounded-full aspect-square w-[3em]" v-else>
          <div :class="{'rounded-full': true, 'aspect-square w-[3em]': true, 'hover:border-2': true, 'transition-all': true, 'duration-150': true, 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps'}" v-if="!userInfo.avatar" />
          <img :class="{'rounded-full': true, 'aspect-square w-[3em]': true, 'hover:border-2': true, 'transition-all': true, 'duration-150': true, 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps'}" :src="mediaPath + userInfo.avatar" :alt="userInfo.display_name" v-else/>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {useMainStore} from "../stores/main";
import {useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()
const store = useMainStore()
const userInfo = computed(() => store.userInfo)
const mediaPath = config.public.NUXT_MEDIA_PATH
const platform = computed(() => store.platform)
const screen_name = computed(() => store.screen_name)

</script>