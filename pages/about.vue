<template>
  <div class="my-10">
    <div >Nothing Here</div>
    <NuxtLink to="/about" class="text-lg font-bold text-5xl dark:text-white">About WebAlbum</NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About'
})

definePageMeta({
  layout: "web-album",
})
</script>
