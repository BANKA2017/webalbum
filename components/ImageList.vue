<template>
  <div id="image-preview">
    <div v-if="video">not supported</div>
    <div v-else>
      <!--大图-->
      <div class="mb-5">
        <div class="relative">
          <div class="absolute top-5 right-5" v-if="state.loadingImage">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-400 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <img v-if="media[state.activeIndex].original_type === 'photo'" class="aspect-video w-full bg-slate-300 dark:bg-slate-700 object-scale-down" :src="mediaPath + media[state.activeIndex].cover + ':orig'" loading="lazy" :alt="media[state.activeIndex].filename" @load="state.loadingImage = false">
          <video v-else controls :poster="mediaPath + media[state.activeIndex].cover" :src="mediaPath + media[state.activeIndex].url" class="aspect-video w-full bg-slate-300 dark:bg-slate-700 object-scale-down" @loadedmetadata="state.loadingImage = false" />
        </div>
      </div>
      <!--小图预览-->
      <div class="flex justify-between">
        <div >
          <div @click="updateIndex(index)" :class="{'bg-slate-300': true, 'dark:bg-slate-700': true, 'cursor-pointer': true, 'inline-block': true, 'mr-5': true, 'aspect-square': true, 'h-24': true, 'border-4': true, 'border-transparent': state.activeIndex !== index, 'border-cyan-500': state.activeIndex === index, 'hover:border-cyan-500': true}" v-for="(mediaItem, index) in media" :key="mediaItem.filename">
            <img class="" :src="mediaPath + mediaItem.cover + ':thumb'" loading="lazy" :alt="mediaItem.filename">
          </div>
        </div>

        <div class="font-sans md:text-3xl lg:text-[4rem] mt-5 hidden lg:block dark:text-gray-200">
          <p>{{(state.activeIndex + 1) + ' / ' + media.length}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, PropType, reactive, watch} from "vue";
import type {Media} from "@/type/Content";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  video: {
    type: Boolean,
    default: false
  },
  media: {
    type: Array as PropType<Media[]>,
    default: () => []
  }
})

const state = reactive<{
  activeIndex: number
  loading: boolean
  loadingImage: boolean
}>({
  activeIndex: 0,
  loading: true,
  loadingImage: true,
})

watch(props.media, () => {
  if (props.media.length) {
    state.loading = false
  }
})

const route = useRoute()
if (route.params.slug.length > 1) {
  const tmpIndex = Number(route.params.slug[1])
  if ([1,2,3,4].includes(tmpIndex)) {
    state.activeIndex = tmpIndex - 1
  }
}

watch(() => state.activeIndex, () => {
  state.loadingImage = true
})

const config = useRuntimeConfig()
const mediaPath = config.public.NUXT_MEDIA_PATH
const router = useRouter()

const updateIndex = (index: number = 0) => {
  state.activeIndex = index
  router.replace(String(index + 1))
}
</script>

<style scoped>

</style>