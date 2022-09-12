<template>
  <div class="my-5">
    <div v-if="state.loading" class="animate-pulse space-y-4">
      <div class="text-4xl font-sans my-4 w-[12vw] bg-slate-300 h-10"></div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="bg-slate-300 aspect-video border-2 border-white select-none" v-for="i in [0,1,2,3,4]" :key="i"></div>
      </div>
    </div>
    <template v-else>
      <div class="my-2" v-for="(photos, date) in realData" :key="date">
        <h3 class="text-4xl font-sans my-4 sticky top-0 bg-white py-2" style="z-index: 9990">{{ date }}</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <router-link class="cursor-pointer bg-slate-300 aspect-video border-2 border-white hover:border hover:border-2 hover:border-sky-700 select-none" v-for="(meta, order) in photos" :key="order" :to="`/photos/${meta.tweet_id}/`">
              <img v-if="meta.origin_type === 'photo'" :src="mediaPath + meta.url + ':small'" :alt="meta.filename" class="w-full aspect-video object-scale-down" />
              <div v-else class="relative">
                <div class="absolute top-2 right-2 px-1 bg-sky-300 text-sm">VIDEO</div>
                <img :src="mediaPath + meta.cover" :alt="meta.filename" class="w-full aspect-video object-scale-down" />
              </div>
          </router-link>
        </div>
      </div>
      <div class="my-2 flex justify-center">
        <div v-if="hasmore" class="border-cyan-600 hover:bg-slate-100 cursor-pointer border-2 rounded-full px-5 py-1 font-bold text-lg select-none" @click="load(maxId)">
          <svg v-if="state.loadmore" class="animate-spin -ml-1 mr-1 h-5 w-5 text-teal-400 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          MORE
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, watch} from "vue";
import {request} from "@/share/Fetch";
import {ApiTweets} from "@/type/Api";
import {Media, Tweet} from "@/type/Content";
import {useHead} from "@vueuse/head";
import {useStore} from "@/store";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
useHead({title: "Album"})

const state = reactive<{
  loading: boolean
  loadmore: boolean
}>({
  loading: true,
  loadmore: false
})

const store = useStore()
const screenName = computed(() => store.state.screen_name)
const platform = computed(() => store.state.platform === 'ns' ? 'nintendo_switch_share' : 'PlayStation®Network') //'nintendo_switch_share'//'PlayStation®Network'
const tweets = computed(() => store.state.tweets)
const basePath = computed(() => store.state.basePath)
const mediaPath = computed(() => store.state.mediaPath)
const maxId = computed(() => store.state.maxId)
const hasmore = computed(() => store.state.hasmore)

const route = useRoute()

const load = (tweet_id: string | number | bigint = -1) => {
  state.loadmore = true
  console.log(basePath.value + "/api/v2/data/search/?count=20&q=filter:twimg OR filter:consumer_video OR filter:pro_video source:" + platform.value + " from:" + screenName.value + ((route.name === 'game' && route.params.game_name) ? ' #' + route.params.game_name.toString() : '') + ((!BigInt(tweet_id) || BigInt(tweet_id) < BigInt(0)) ? '' : ' max_id:' + String(BigInt(tweet_id) - BigInt(1)) ))
  const queryArray = ['filter:twimg OR filter:consumer_video OR filter:pro_video', `source:${platform.value}`, `from:${screenName.value}`]
  //game name
  if (route.name === 'game' && route.params.game_name) {
    queryArray.push(`#${route.params.game_name.toString()}`)
  }
  //max id
  if ((BigInt(tweet_id) && BigInt(tweet_id) > BigInt(0))) {
    queryArray.push('max_id:' + String(BigInt(tweet_id) - BigInt(1)))
  }
  request<ApiTweets>(basePath.value + "/api/v2/data/search/?" + new URLSearchParams({
    count: '20',
    q: queryArray.join(' '),
  })).then(response => {
    if (response.code === 200) {
      if (tweets.value.length) {
        store.dispatch('pushCoreValue', {key: 'tweets', value: response.data.tweets} )
      } else {
        store.dispatch('setCoreValue', {key: 'tweets', value: response.data.tweets} )
      }
      store.dispatch('setCoreValue', {key: 'maxId', value: response.data?.bottom_tweet_id || '0'} )
      store.dispatch('setCoreValue', {key: 'hasmore', value: response.data?.hasmore || false} )
    }

    state.loading = false
    state.loadmore = false
    //store.updateLoadingStatus(false)
  }).catch(e => {
    //store.updateLoadingStatus(false)
    console.error(e)
    state.loadmore = false
  })
}

onMounted(() => {
  //store.updateLoadingStatus(true)
  //TODO fix update
  //if (!tweets.value.length) {
    load()
  //} else {
  //  state.loading = false
  //}
})

watch(platform, () => {
  load()
})

onBeforeRouteUpdate((to, from, next) => {
  //force update
  //if ((to.name === 'main' && from.name === 'game') || (to.name === 'game' && from.name === 'main')) {
    load()
  //}
  next()
})

const realData = computed(() => {
  let tmpData: {[p: string]: Media[]} = {}
  tweets.value.map(x => x.mediaObject.map(y => {
    let tmpDate = new Date(x.time * 1000)
    //console.log(tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1))
    if (tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)]) {
      tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)].push(y)
    } else {
      tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)] = [y]
    }
  }))
  //console.log(tmpData)
  return tmpData
})

</script>
