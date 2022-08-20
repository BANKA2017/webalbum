<template>
  <div class="mt-4">
    <div class="flex items-center justify-between">
      <router-link to="/" class="text-4xl py-1 font-extrabold bg-clip-text hover:underline hover:underline-offset-2">
        Album <span class="bg-black text-white px-2 rounded-2xl text-sm">beta</span>
      </router-link>
      <div class="flex justify-end items-center">
        <router-link to="/settings" class="ml-2 bg-slate-200 rounded-full aspect-square w-[3em]">
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
</script>