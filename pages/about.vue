<template>
  <div class="my-10">
    <div >hhh</div>
    <NuxtLink to="/about" class="text-lg font-bold text-5xl dark:text-white">关于 WebAlbum</NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于'
})

definePageMeta({
  layout: "web-album",
})
</script>
