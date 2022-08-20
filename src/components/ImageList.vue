<template>
  <div id="image-preview">
    <div v-if="video">not supported</div>
    <div v-else>
      <!--大图-->
      <div class="mb-5">
        <img class="w-full aspect-video bg-slate-300" :src="mediaPath + media[state.activeIndex].cover + ':orig'" loading="lazy" :alt="media[state.activeIndex].filename">
      </div>
      <!--小图预览-->
      <div class="flex justify-between">
        <div >
          <div @click="state.activeIndex = index" :class="{'bg-slate-300': true, 'cursor-pointer': true, 'inline-block': true, 'mr-5': true, 'aspect-square': true, 'h-24': true, 'border-4': true, 'border-transparent': state.activeIndex !== index, 'border-cyan-500': state.activeIndex === index, 'hover:border-cyan-500': true}" v-for="(mediaItem, index) in media" :key="mediaItem.filename">
            <img class="" :src="mediaPath + mediaItem.cover + ':thumb'" loading="lazy" :alt="mediaItem.filename">
          </div>
        </div>

        <div class="font-sans" style="font-size: 4rem;">
          {{(state.activeIndex + 1) + ' / ' + media.length}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, PropType, reactive, watch} from "vue";
import {Media} from "@/type/Content";
import {truncate} from "fs";
import {useStore} from "@/store";

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
}>({
  activeIndex: 0,
  loading: true
})

watch(props.media, () => {
  if (props.media.length) {
    state.loading = false
  }
})

const store = useStore()
const mediaPath = computed(() => store.state.mediaPath)
</script>

<style scoped>

</style>