<template id="not-found">
  <div class="text-center mt-[30vh]">
    <h1 class="text-8xl font-bold">404</h1>
    <p class="text-2xl font-light">Nothing here</p>
    <p class="mt-5">{{now}}</p>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue"
import {useHead} from "@vueuse/head"
import { useStore } from "@/store"
import {useI18n} from "vue-i18n";

//const { t } = useI18n()
const store = useStore()
const now = computed(() => store.state.now)
useHead({
  title: '404',
})

</script>

<style scoped>
.y-center {
  padding: 40vh 0 0 0;
}
</style>
