<template>
  <div class="mt-4">
    <div class="flex items-center justify-between">
      <div class="text-4xl py-1 font-bold bg-clip-text">
        <router-link to="/" class="inline-block mr-2 ">Album</router-link>
        <span :class="{'select-none': true, 'text-white': true, 'px-2': true, 'rounded-2xl': true, 'text-sm': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps'}">{{ platform }}</span>
      </div>

      <div class="flex justify-end items-center">
        <router-link to="/settings" class="border-2 border-cyan-500 hover:bg-slate-100 px-3 py-1" v-if="!screen_name">
          Settings
        </router-link>
        <router-link to="/settings" class="ml-2 bg-slate-200 rounded-full aspect-square w-[3em]" v-else>
          <img class="rounded-full aspect-square w-[3em]" :src="mediaPath + userInfo.avatar" :alt="userInfo.display_name" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useStore} from "@/store";
import {computed} from "vue";

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const mediaPath = computed(() => store.state.mediaPath)
const platform = computed(() => store.state.platform)
const screen_name = computed(() => store.state.screen_name)

</script>