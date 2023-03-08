<template>
  <div>
    <NuxtLayout name="web-album">
      <div class="my-10">
        <h1 class="text-6xl mb-5 dark:text-white">{{ error.statusCode }}</h1>
        <p class="text-xl dark:text-sky-100">{{ errorMessage[error.statusCode] ? errorMessage[error.statusCode] : '什么问题？' }}，回<NuxtLink to="/" class="underline hover:bg-black hover:text-white px-2 transition-color">首页</NuxtLink>看看吧</p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {NuxtError} from "@nuxt/types"
useHead({title: 'Error'})
const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    default: ({statusCode: 404})
  }
})

const errorMessage = {
  302: '跳转中……',
  404: '😅根本没有这个页面',
  500: '😅不用刷新了，已经炸了',
}

definePageMeta({
  layout: "web-album",
})
</script>

<style scoped>

</style>