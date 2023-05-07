<template>
  <div id="photos">
    <div class="grid grid-cols-4 my-10 gap-10" v-if="state.tweet.length">
      <div class="col-start-1 col-span-4 md:col-span-3">
        <image-list :media="state.tweet[0].media" :video="false" />
        <!--<div class=" snap-x scroll-smooth">
          <div class="snap-center" v-for="(media, order) in tweet[0].media" :key="order">
            <img :src="mediaPath + media.cover + ':orig'" loading="lazy" :alt="media.filename">
          </div>
        </div>-->
      </div>
      <div class="col-start-1 col-span-4 md:col-start-4 md:col-span-1 dark:text-gray-200">
        <ul class="mb-2" v-if="gameHash.length > 0">
          <li v-for="(entity, order) in gameHash" :key="order"><NuxtLink :to="{path: '/', query: {game: entity}}" class="text-lg font-bold before:content-['#'] hover:underline hover:underline-offset-2" >{{ entity }}</NuxtLink></li>
        </ul>
        <hr class="my-5" v-if="gameHash.length > 0"/>
        <h3 class="text-xl font-bold mb-2">Download</h3>
        <div class="w-full" v-if="state.tweet[0].media[0].origin_type === 'photo'">
          <a class="block col-span-1 border-2 border-slate-300 hover:border-sky-500 w-full px-2 py-1 mb-1" :href="mediaPath + media.url + ':orig'" target="_blank" v-for="(media, index) in state.tweet[0].media" :key="media.filename">{{`${index + 1}. ${media.basename}`}}</a>
        </div>
        <div v-else class="w-full font-mono">
          <a class="block col-span-1 border-2 border-slate-300 hover:border-sky-500 w-full px-2 py-1 mb-3" :href="mediaPath + state.tweet[0].media[0].url" target="_blank">{{ state.tweet[0].media[0].basename }}</a>
          <p :class="{'inline-block': true, 'rounded-full': true, 'text-white': true, 'text-sm': true, 'px-2': true, 'mr-2': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox'}">{{ `${state.tweet[0].media[0].origin_info_width}x${state.tweet[0].media[0].origin_info_height}` }}</p>
          <p :class="{'inline-block': true, 'rounded-full': true, 'text-white': true, 'text-sm': true, 'px-2': true, 'mr-2': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox'}">{{ `${state.tweet[0].media[0].bitrate / 1000} kbps` }}</p>
        </div>
        <hr class="my-3" />
        <p class="my-3">{{new Date(state.tweet[0].time * 1000).toLocaleString()}}</p>
        <a :href="`https://twitter.com/${state.tweet[0].name}`" class="my-3 border-2 border-[#1da1f2] hover:bg-[#1da1f2] hover:text-white px-2 py-2 w-full block transition-colors duration-150" target="_blank">
            <span class="after:content-['_↗'] no-underline select-none">@{{ state.tweet[0].name }}</span>
        </a>
        <a :href="`https://twitter.com/i/status/${state.tweet[0].tweet_id}`" class="my-3 bg-[#1da1f2] hover:bg-[#2488bf] px-2 py-2 w-full block transition-colors duration-150" target="_blank">
          <span class="after:content-['_↗'] text-white no-underline select-none">Twitter</span>
        </a>
      </div>
    </div>
    <div v-else class="animate-pulse grid grid-cols-4 my-10 gap-10">
      <div class="col-start-1 col-span-4 md:col-span-3">
        <div class="mb-5">
          <div class="w-full aspect-video bg-slate-300"></div>
        </div>
        <!--小图预览-->
        <div class="inline-block md:w-[70%]">
          <div class="bg-slate-300 inline-block aspect-square w-24 h-24 mr-5" v-for="i in [0,1,2,3]" :key="i"></div>
        </div>
      </div>
      <div class="col-start-1 col-span-4 md:col-start-4 md:col-span-1">
        <div class="h-5 bg-slate-200 rounded mb-2"></div>
        <div class="h-5 bg-slate-200 rounded my-2"></div>
        <div class="h-5 bg-slate-200 rounded my-2"></div>
        <div class="aspect-video bg-slate-200 rounded my-2"></div>
        <div class="h-10 bg-slate-200 rounded my-2"></div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useMainStore} from "~/stores/main";
import {Tweet} from "~/type/Content";
import {ApiTweets} from "~/type/Api";
import {request} from "~/share/Fetch";

useHead({title: 'Photos'})

const state = reactive<{
  tweet: Tweet[]
}>({
  tweet: []
})

const route = useRoute()
const config = useRuntimeConfig()
const store = useMainStore()
const basePath = config.public.NUXT_BASE_PATH
const mediaPath = config.public.NUXT_MEDIA_PATH
const storeTweets = computed(() => store.tweets)
const platform = computed(() => store.platform)
const tweets = computed(() => storeTweets.value.filter(x => x.tweet_id === route.params.slug[0].toString()))
state.tweet = tweets.value
const gameHash = computed(() => {
  if (!state.tweet[0]) {
    return []
  } else {
    return state.tweet[0].entities
  }
})

if (state.tweet.length === 0) {
  //get tweet online
  request<ApiTweets>(basePath + "/data/list/?photos=1&tweet_id=" + route.params.slug[0].toString()).then(response => {
    state.tweet = response.data.tweets//store.dispatch('setCoreValue', {key: 'tweets', value: response.data.tweets} )
    //store.updateLoadingStatus(false)
  }).catch(e => {
    //store.updateLoadingStatus(false)
    console.error(e)
  })
}

definePageMeta({
  layout: "web-album",
})

</script>

<style scoped>

</style>