<template>
  <div id="app">
    <div class="min-h-screen dark:bg-black">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-start-1 col-span-12 md:col-start-2 md:col-span-10">
          <div class="mx-4 md:mx-1">
            <main-title />
            <slot />
            <Footer />
          </div>
        </div>
      </div>
      <loading />
      <div v-if="route.name !== 'settings'" :class="{'fixed': true, 'right-5': true, 'bottom-20': true, 'px-3': true, 'py-2': true, 'cursor-pointer': true, 'border-2': true, 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps', 'border-[#107C10]': platform === 'xbox', 'transition-colors': true, 'duration-150': true, 'select-none': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', 'text-white': true}" style="z-index: 9999" @click="ScrollTo()">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import MainTitle from "~/components/MainTitle.vue";
import Footer from "~/components/Footer.vue";
import Loading from "~/components/Loading.vue";
import {ScrollTo} from "~/share/Tools";
import {useMainStore} from "~/stores/main";
import {useRoute} from "vue-router";

const store = useMainStore()
const platform = computed(() => store.platform)

const route = useRoute()

</script>

<style lang="css">

</style>