<template>
  <div id="photos">
    <div class="grid grid-cols-4 my-10 gap-10" v-if="tweet.length">
      <div class="col-start-1 col-span-4 md:col-span-3">
        <image-list :media="tweet[0].mediaObject" :video="false" />
        <!--<div class=" snap-x scroll-smooth">
          <div class="snap-center" v-for="(media, order) in tweet[0].mediaObject" :key="order">
            <img :src="mediaPath + media.cover + ':orig'" loading="lazy" :alt="media.filename">
          </div>
        </div>-->
      </div>
      <div class="col-start-1 col-span-4 md:col-start-4 md:col-span-1">
        <ul class="mb-2">
          <li v-for="(entity, order) in gameHash" :key="order"><router-link :to="'/game/' + entity.text" class="text-lg font-bold before:content-['#'] hover:underline hover:underline-offset-2" >{{entity.text}}</router-link></li>
        </ul>
        <div class="border-2 p-5">
          <h4 class="text-xl font-bold">提示</h4>
          <p >右键下载图片</p>
        </div>
      </div>
    </div>
    <div v-else class="animate-pulse grid grid-cols-4 my-10 gap-10">
      <div class="col-start-1 col-span-4 md:col-span-3">
        <div class="mb-5">
          <div class="w-full aspect-video bg-slate-300"></div>
        </div>
        <!--小图预览-->
        <div class="flex justify-between space-x-5 md:w-[70%]">
          <div class="bg-slate-300 inline-block aspect-square w-full" v-for="i in [0,1,2,3]" :key="i"></div>
        </div>
      </div>
      <div class="col-start-1 col-span-4 md:col-start-4 md:col-span-1">
        <div class="h-5 bg-slate-200 rounded mb-2"></div>
        <div class="h-5 bg-slate-200 rounded my-2"></div>
        <div class="h-5 bg-slate-200 rounded my-2"></div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed} from "vue"
import {useRoute} from "vue-router"
import {useStore} from "@/store";
import ImageList from "@/components/ImageList.vue";
import {request} from "@/share/Fetch";
import {ApiTweets} from "@/type/Api";

const route = useRoute()
const store = useStore()
const basePath = computed(() => store.state.basePath)
const mediaPath = computed(() => store.state.mediaPath)
const storeTweets = computed(() => store.state.tweets)
const tweet = computed(() => storeTweets.value.filter(x => x.tweet_id_str === route.params.tweet_id.toString()))
const gameHash = computed(() => {
  if (!tweet.value[0]) {
    return []
  } else {
    return tweet.value[0].entities.filter(x => x.type === 'hashtag' && !['ps5share', 'nintendoswitch'].includes(x.text.toLowerCase()))
  }
})

if (tweet.value.length === 0) {
  //get tweet online
  request<ApiTweets>(basePath.value + "/api/v2/data/tweets/?is_status=1&load_conversation=0&tweet_id=" + route.params.tweet_id.toString()).then(response => {
    store.dispatch('setCoreValue', {key: 'tweets', value: response.data.tweets} )
    //store.updateLoadingStatus(false)
  }).catch(e => {
    //store.updateLoadingStatus(false)
    console.error(e)
  })
}

</script>

<style scoped>

</style>