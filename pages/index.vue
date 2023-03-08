<template>
  <div class="my-5">
    <div v-if="state.loading" class="animate-pulse space-y-4">
      <div class="text-4xl font-sans my-4 w-[12vw] bg-slate-300 h-10"></div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="bg-slate-300 aspect-video border-2 border-white select-none" v-for="i in [0,1,2,3,4]" :key="i"></div>
      </div>
    </div>
    <template v-else>
      <div class="snap-x snap-mandatory flex flex-nowrap flex-row overflow-auto scroll-smooth">
        <NuxtLink :to="{path: '/', query: {game: Object.keys(game.tags).includes(queryGame) ? undefined : game.mostTag}}" v-for="game in tagList" :key="game.gameId" :class="{'inline-block': true, 'mr-2': true, 'mb-2': true, 'px-3': true, 'py-1': true, 'rounded-xl': true, 'border-2': true, 'text-sm': true, 'bg-[#E60012]': platform === 'ns' && Object.keys(game.tags).includes(queryGame), 'bg-[#0070D1]': platform === 'ps' && Object.keys(game.tags).includes(queryGame), 'text-white': Object.keys(game.tags).includes(queryGame), 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps', 'snap-always': true, 'snap-center': true, 'flex-none': true, }" >{{game.mostTag}} <span class="ml-1 bg-gray-500 rounded-lg py-0.5 px-1 text-white text-sm font-mono">{{game.count}}</span></NuxtLink>
      </div>
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
              <img :src="mediaPath + meta.cover + ':small'" :alt="meta.filename" class="w-full aspect-video object-scale-down" loading="lazy" />
            </div>
          </router-link>
        </div>
      </div>
      <div class="my-2 flex justify-center">
        <div v-if="hasmore" class="border-cyan-600 hover:bg-slate-100 cursor-pointer border-2 rounded-full px-5 py-1 font-bold text-lg select-none" @click="load(maxId, queryGame)">
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

import {useMainStore} from "~/stores/main";
import {Media} from "~/type/Content";
import {controller, request} from "~/share/Fetch";
import {ApiTweets} from "~/type/Api";

useHead({title: "Album"})

const state = reactive<{
  loading: boolean
  loadmore: boolean
}>({
  loading: true,
  loadmore: false
})

const config = useRuntimeConfig()
const store = useMainStore()
const screenName = computed(() => store.screen_name)
const platform = computed(() => store.platform) //'nintendo_switch_share'//'PlayStation®Network'
const tweets = computed(() => store.tweets)
const basePath = config.public.NUXT_BASE_PATH
const mediaPath = config.public.NUXT_MEDIA_PATH
const maxId = computed(() => store.maxId)
const hasmore = computed(() => store.hasmore)

const route = useRoute()
const cancelToken = controller
const load = (tweet_id: string | number | bigint = -1, game: string = '') => {
  state.loadmore = true

  let queryObject: {[p: string]: string} = {
    name: screenName.value,
    platform: platform.value
  }
  //game name
  if (game) {
    queryObject.game = game
  }
  //max id
  let sinceTweetId = false
  if ((BigInt(tweet_id) && BigInt(tweet_id) > BigInt(0))) {
    queryObject.tweet_id = String(BigInt(tweet_id) - BigInt(1))
    sinceTweetId = true
  }
  request<ApiTweets>(basePath + "/data/list/?" + new URLSearchParams(queryObject), cancelToken).then(response => {
    if (response.code === 200) {
      if (tweets.value.length && sinceTweetId) {
        store.updateCoreValue('tweets', tweets.value.concat(response.data.tweets))
      } else {
        store.updateCoreValue('tweets', response.data.tweets)
      }
      store.updateCoreValue('maxId', response.data?.bottom_tweet_id || '0')
      store.updateCoreValue('hasmore', response.data?.hasmore || false)
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
    load(-1, queryGame.value)
  } else {
    if (queryGame.value) {
      store.updateCoreValue('tweets', tweets.value.filter(x => x.entities.includes(queryGame.value)))
    }
    state.loading = false
  }
})

watch(platform, () => {
  load(-1, queryGame.value)
})

onBeforeRouteUpdate((to, from) => {
  if (to.query.game !== from.query.game) {
    load(-1, (to.query?.game || '').toString())
  }
})

const queryGame = computed(() => (route.query?.game || '').toString())
const tagList = computed(() => {
  const tmpList = tweets.value.filter(tweet => tweet.entities.length).map(tweet => tweet.entities)
  let list: {[p: string]: {count: number, gameId: number}} = {}
  let gameCount: number[] = []
  let gameId = 0
  tmpList.forEach(tags => {
    let updateGameId = false
    //try to gei gameId
    let tmpGameId = gameId
    gameId += (tags.some(tag => {
      if (list[tag]) {
        tmpGameId = list[tag].gameId
        return true
      }
      return false
    }) ? 0 : 1 )
    if (gameCount[tmpGameId]) {
      gameCount[tmpGameId]++
    } else {
      gameCount[tmpGameId] = 1
    }
    tags.forEach(tag => {
      if (list[tag]) {
        list[tag].count++
      } else {
        updateGameId = true
        list[tag] = {
          count: 1,
          gameId: tmpGameId
        }
      }
    })
  })
  let list2: {gameId: number; tags: {[p: string]: number}; count: number; mostTag: string}[] = []
  for (const gameName in list) {
    if (!list2[list[gameName].gameId]) {
      list2[list[gameName].gameId] = {
        gameId: list[gameName].gameId,
        tags: {[gameName]: list[gameName].count},
        count: gameCount[list[gameName].gameId],
        mostTag: ''
      }
    } else {
      list2[list[gameName].gameId].tags[gameName] = list[gameName].count
    }
  }
  list2.map(list => {
    list.mostTag = Object.keys(list.tags).sort((a, b) => list.tags[b] - list.tags[a])[0]
    return list
  })

  return list2.sort((a, b) => b.count - a.count)
})

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


definePageMeta({
  layout: "web-album",
})

</script>

<style scoped lang="scss">
.cover-item {
  transition: all;
  transition-delay: 150ms;
  .dl {
    opacity: 0;
  }
  &:hover {
    .dl {
      opacity: 100%;
    }
  }
}
</style>