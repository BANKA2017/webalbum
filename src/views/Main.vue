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
          <router-link class="cursor-pointer bg-slate-300 aspect-video border-2 border-2 border-white hover:border-sky-700 select-none" v-for="(meta, order) in photos" :key="order" :to="`/photos/${meta.tweet_id}/`">
            <div class="relative w-full aspect-video cover-item ">
              <div :class="{absolute: true, 'top-2': true, 'right-2': true, 'px-1': true, 'text-sm': true, 'text-white': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps'}" v-if="meta.origin_type !== 'photo'">VIDEO</div>
              <a :href="mediaPath + meta.url + (meta.origin_type === 'photo' ? ':orig' : '')" :class="{absolute: true, 'bottom-2': true, 'right-2': true, 'px-1': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'text-sm': true, 'text-white': true, 'w-8': true, 'h-8': true, 'transition-all': true, 'duration-150': true, 'dl': true}" target="_blank" @click="e => {e.stopPropagation()}">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
              </a>
              <img :src="mediaPath + meta.cover + ':small'" :alt="meta.filename" class="w-full aspect-video object-scale-down" />
            </div>
          </router-link>
        </div>
      </div>
      <div class="my-2 flex justify-center">
        <div v-if="hasmore" class="border-cyan-600 hover:bg-slate-100 cursor-pointer border-2 rounded-full px-5 py-1 font-bold text-lg select-none" @click="load(maxId)">
          <svg v-if="state.loadmore" :class="{'animate-spin': true, '-ml-1': true, 'mr-1': true, 'h-5': true, 'w-5': true, 'inline-block': true, 'text-[#E60012]': platform === 'ns', 'text-[#0070D1]': platform === 'ps'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
import {controller, request} from "@/share/Fetch";
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
const platform = computed(() => store.state.platform) //'nintendo_switch_share'//'PlayStation®Network'
const tweets = computed(() => store.state.tweets)
const basePath = computed(() => store.state.basePath)
const mediaPath = computed(() => store.state.mediaPath)
const maxId = computed(() => store.state.maxId)
const hasmore = computed(() => store.state.hasmore)

const route = useRoute()
const cancelToken = controller
const load = (tweet_id: string | number | bigint = -1) => {
  state.loadmore = true

  let queryObject: {[p: string]: string} = {
    name: screenName.value,
    platform: platform.value
  }
  //game name
  if (route.name === 'game' && route.params.game_name) {
    queryObject.game = route.params.game_name.toString()
  }
  //max id
  let sinceTweetId = false
  if ((BigInt(tweet_id) && BigInt(tweet_id) > BigInt(0))) {
    queryObject.tweet_id = String(BigInt(tweet_id) - BigInt(1))
    sinceTweetId = true
  }
  request<ApiTweets>(basePath.value + "/data/list/?" + new URLSearchParams(queryObject), cancelToken).then(response => {
    if (response.code === 200) {
      if (tweets.value.length && sinceTweetId) {
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
  if (!tweets.value.length) {
    load()
  } else {
    state.loading = false
  }
})

watch(platform, () => {
  load()
})

//onBeforeRouteUpdate((to, from, next) => {
//  //force update
//  //if ((to.name === 'main' && from.name === 'game') || (to.name === 'game' && from.name === 'main')) {
//    load()
//  //}
//  next()
//})

const realData = computed(() => {
  let tmpData: {[p: string]: Media[]} = {}
  tweets.value.map(x => x.media.map(y => {
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

<style scoped lang="scss">
  .cover-item {
    transition: all;
    transition-delay: 150ms;
    .dl {
      display: none;
    }
    &:hover {
      .dl {
        display: block;
      }
    }
  }
</style>