<template>
  <div class="fixed right-3 top-5" v-if="loading">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-300 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue"
import {onBeforeRouteLeave} from "vue-router"
import {useStore} from "@/store";
import {computed} from "vue";

const store = useStore()
const loading = computed(() => store.state.loading)

onMounted(() => {store.dispatch('setCoreValue', {key: 'loading', value: false})})
onBeforeRouteLeave(() => {store.dispatch('setCoreValue', {key: 'loading', value: true})})

</script>

<style scoped>

</style>