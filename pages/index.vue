<template>
  <div class="my-5">
    <div class="dark:text-white border-2 p-5 rounded-2xl ">
      <h1 class="text-3xl">GoodBye~</h1>
      <hr class="my-4" />
      <a href="https://www.nintendo.co.jp/support/information/2024/0509.html" target="_blank" class="text-2xl hover:underline"><span class="text-[#E60012]">Nintendo Switch</span> > Nintendo SwitchのX（旧Twitter）連携機能および 「フレンドおすすめ機能」のSNS連携終了のお知らせ</a>
      <div class="border-2 p-5 text-center my-3">X（旧Twitter）連携および<br />「フレンドおすすめ機能」のSNS連携終了日時<br /><br />2024年6月11日（火）午前9時</div>
      <p>HOMEメニューの「アルバム」から、X（旧Twitter）に画面写真や動画を投稿する機能は、ご利用いただけなくなります。</p>
      <hr class="my-4" />
      <a href="https://www.playstation.com/en-us/support/important-notice/" target="_blank" class="text-2xl hover:underline"><span class="text-[#0070D1]">PlayStation</span> > Termination of X (formerly known as Twitter) integration</a>
      <p>As of November 13, 2023, integration with X (formerly known as Twitter) will no longer function on PlayStation 5 and PlayStation 4 consoles. This includes the ability to view any content published on X on PS5/PS4, and the ability to post and view content, trophies, and other gameplay-related activities on X directly from PS5/PS4 (or link an X account to do so). For details on how to share game captures from PS5, click <a href="https://www.playstation.com/en-us/support/games/ps5-game-captures-ps-app/" target="_blank" class="underline">here</a>, and for PS4, click <a href="https://www.playstation.com/en-us/support/games/ps4-edit-share-screenshots-clips/" target="_blank" class="underline">here</a>.</p>
      <hr class="my-4" />
      <a href="https://twitter.com/Xbox/status/1649154451045793793" target="_blank" class="text-2xl hover:underline"><span class="text-[#107C10]">Xbox</span> > Twitter Reply</a>
      <p>We have had to disable the ability to share game uploads to Twitter directly from the console and Game Bar on Windows. You can still share your favorite moments to Twitter via the Xbox app for Android and iOS.</p>
      <hr class="my-4" />
      <p >You can still access the content of individual tweets by visiting <span class="font-mono">/photos/:tweet_id</span> (likes <NuxtLink to="/photos/1761103726310277143" class="underline">/photos/1761103726310277143</NuxtLink>) until we completely shut down the backend service of gamealbum.</p>
    </div>
    <div v-if="false" class="animate-pulse space-y-4">
      <div class="text-4xl font-sans my-4 w-[12vw] bg-slate-300 dark:bg-slate-700 h-10"></div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div class="bg-slate-300 dark:bg-slate-700 aspect-video border-2 border-white dark:border-black select-none" v-for="i in new Array(5)" :key="i"></div>
      </div>
    </div>
    <template v-else>
      <div class="snap-x snap-mandatory flex flex-nowrap flex-row overflow-auto scroll-smooth">
        <NuxtLink :to="{path: '/', query: {game: Object.keys(game.tags).includes(queryGame) ? undefined : game.mostTag}}" v-for="game in tagList" :key="game.gameId" :class="{'inline-block': true, 'mr-2': true, 'mb-2': true, 'px-3': true, 'py-1': true, 'rounded-xl': true, 'border-2': true, 'text-sm': true, 'bg-[#E60012]': platform === 'ns' && Object.keys(game.tags).includes(queryGame), 'bg-[#0070D1]': platform === 'ps' && Object.keys(game.tags).includes(queryGame), 'bg-[#107C10]': platform === 'xbox' && Object.keys(game.tags).includes(queryGame), 'dark:text-white': true, 'text-white': Object.keys(game.tags).includes(queryGame), 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps', 'border-[#107C10]': platform === 'xbox', 'snap-always': true, 'snap-center': true, 'flex-none': true, }" >{{game.mostTag}} <span class="ml-1 bg-gray-500 dark:bg-gray-700 rounded-lg py-0.5 px-1 text-white text-sm font-mono">{{game.count}}</span></NuxtLink>
      </div>
      <div class="my-2" v-for="(photos, date) in realData" :key="date">
        <div class="justify-between flex sticky py-2 top-0 bg-white dark:bg-black group/date cursor-pointer" style="z-index: 9990" @click="(e) => {selectEvent(e, photos, false, !checkExist(photos))}">
            <h3 class="text-4xl font-sans bg-white dark:bg-black dark:text-white inline-block" style="z-index: 9990">{{ date }}</h3>
            <div :class="{'inline-block':true, }" >
                <div :class="{'w-5': true, 'rounded-full': true, 'bg-gray-700': !checkExist(photos), 'bg-[#E60012]': checkExist(photos) && platform === 'ns', 'bg-[#0070D1]': checkExist(photos) && platform === 'ps', 'bg-[#107C10]': checkExist(photos) && platform === 'xbox', 'text-white': true, 'my-2': true, 'group-hover/date:opacity-100': true, 'opacity-0': !selectedMode , 'transition': true}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <router-link :class="{'cursor-pointer': true, 'bg-slate-300': true, 'dark:bg-slate-700': true, 'aspect-video': true, 'border-2': true, 'border-white': !state.selectedList.has(meta), 'dark:border-black': !state.selectedList.has(meta), 'border-sky-700': selectedMode && state.selectedList.has(meta), 'hover:border-sky-700': true, 'dark:border-sky-300': selectedMode && state.selectedList.has(meta), 'dark:hover:border-sky-300': true, 'select-none': true, }" v-for="(meta, order) in photos" :key="order" :to="`/photos/${meta.tweet_id}/${meta.index}`">
            <div class="relative w-full aspect-video cover-item group/cover" @click="(e) => {selectEvent(e, [meta], false)}" >
              <div :class="{absolute: true, 'p-2': true, 'rounded-full': true, 'text-sm': true, 'text-white': true, 'group-hover/cover:block': true, hidden: !selectedMode}" @click="(e) => {selectEvent(e, [meta], true)}">
                  <div :class="{'w-5': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', 'rounded-full': true, }">
                      <svg v-if="state.selectedList.has(meta)" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                      </svg>
                  </div>
              </div>
              <div :class="{absolute: true, 'top-2': true, 'right-2': true, 'px-1': true, 'text-sm': true, 'text-white': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', }" v-if="meta.original_type !== 'photo'">VIDEO</div>
              <a :href="mediaPath + meta.url + (meta.original_type === 'photo' ? ':orig' : '')" :class="{absolute: true, 'bottom-2': true, 'right-2': true, 'px-1': true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', 'text-sm': true, 'text-white': true, 'w-8': true, 'h-8': true, 'transition-all': true, 'duration-150': true, 'dl': true}" target="_blank" @click="e => {e.stopPropagation()}" v-if="!selectedMode">
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
        <div v-if="hasmore" class="border-cyan-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white cursor-pointer border-2 rounded-full px-5 py-1 font-bold text-lg select-none" @click="load(maxId, queryGame)">
          <svg v-if="state.loadmore" :class="{'animate-spin': true, '-ml-1': true, 'mr-1': true, 'h-5': true, 'w-5': true, 'inline-block': true, 'text-[#E60012]': platform === 'ns', 'text-[#0070D1]': platform === 'ps', 'text-[#107C10]': platform === 'xbox', }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          MORE
        </div>
      </div>
    </template>
    <div :class="{'fixed': true, 'right-5': true, 'bottom-32': true, 'cursor-pointer': true, 'border-2': true, 'border-[#E60012]': platform === 'ns', 'border-[#0070D1]': platform === 'ps', 'border-[#107C10]': platform === 'xbox', 'transition-colors': true, 'duration-150': true, 'select-none': true, }" style="z-index: 9999" v-if="selectedMode">
        <div class="px-2 py-1 text-center relative overflow-hidden bg-white dark:bg-black dark:text-white">
            <span >{{ state.selectedList.size }}</span>
            <div :class="{'px-2':true, 'py-1':true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', 'text-white': true, 'absolute':true, 'top-0':true, 'left-0':true, 'opacity-0':true, 'hover:opacity-100':true,}" @click="(e) => {downloadControllerList[downloadControllerList.length - 1].abort();selectEvent(e, [...state.selectedList], true);}">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </div>
        <div v-if="state.downloadCount" :class="{'px-2':true, 'py-1':true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', 'text-white': true, 'text-center': true, 'w-[2.5em]': true, }">
            <span >{{ state.downloadCount }}</span>
        </div>
        <div v-else :class="{'px-2':true, 'py-1':true, 'bg-[#E60012]': platform === 'ns', 'bg-[#0070D1]': platform === 'ps', 'bg-[#107C10]': platform === 'xbox', 'text-white': true}" @click="downloadAll()">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useMainStore} from "~/stores/main";
import type {Media} from "~/type/Content";
import {Controller, controller, request} from "~/share/Fetch";
import type {ApiTweets} from "~/type/Api";
import {Download} from "~/share/Tools"
import {BlobReader, BlobWriter, ZipWriter} from "@zip.js/zip.js";

useHead({title: "Album"})

const state = reactive<{
  loading: boolean
  loadmore: boolean
  downloadCount: number
  touchTimestamp: number
  selectedList: Set<Media>
}>({
  loading: true,
  loadmore: false,
  downloadCount: 0,
  touchTimestamp: 0,
  selectedList: new Set(),
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
const hashtagsCount = computed(() => store.hashtags_count)

const route = useRoute()
const cancelToken = controller
const load = (tweet_id: string | number | bigint = -1, game: string = '') => {
  //TODO bye~
  return
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
      if (response.data.tweets.length) {
        store.updateCoreValue('maxId', response.data?.bottom_tweet_id || '0')
        store.updateCoreValue('hasmore', response.data?.hasmore || false)
      }
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
const selectedMode = computed(() => state.selectedList.size > 0)
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
  tweets.value.filter(tweet => tweet.entities.length <= hashtagsCount.value).map(x => x.media.map((y, index) => {
    let tmpDate = new Date(x.time * 1000)
    //console.log(tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1))
    y.index = index + 1
    if (tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)]) {
      tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)].push(y)
    } else {
      tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)] = [y]
    }
  }))
  //console.log(tmpData)
  return tmpData
})

const selectEvent = (e: Event, meta: Media[], checkIcon: boolean = false, forceAdd: boolean = false) => {
  if (checkIcon) {
    e.stopPropagation()
    e.preventDefault()
  } else if (selectedMode.value) {
    e.preventDefault()
  }
  for (const mediaItem of meta) {
    if (state.selectedList.has(mediaItem)) {
      if (!forceAdd) {
        state.selectedList.delete(mediaItem)
      }
    } else {
      state.selectedList.add(mediaItem)
    }
  }
}

const checkExist = (mediaList: Media[]) => {
  return !mediaList.some(media => !state.selectedList.has(media))
}

const downloadControllerList: AbortController[] = [new AbortController()]
const downloadAll = async () => {
  downloadControllerList[downloadControllerList.length - 1].abort()
  const blobList: {blob: string, filename: string; blobObject: Blob}[] = []
  downloadControllerList.push(new Controller())
  let nowSignal = downloadControllerList[downloadControllerList.length - 1].signal
  for (const metaItem of [...state.selectedList]) {
    if (nowSignal.aborted) {
      break
    }
    try {
      const response = await fetch(mediaPath + metaItem.url + (metaItem.url.endsWith('mp4') ? '' : ':orig'), {
        signal: nowSignal
      }).then(response => response.blob())
      blobList.push({blob: URL.createObjectURL(response), filename: `${metaItem.uid}_${metaItem.tweet_id}_${metaItem.index}_${metaItem.filename}.${metaItem.extension}`, blobObject: response})
    } catch (e) {
      console.log(e, metaItem)
    }
    state.downloadCount++
  }
  setTimeout(() => {
    state.downloadCount = 0
  }, 1500)
    if (blobList.length) {
        const zipWriter = new ZipWriter(new BlobWriter("application/zip"), { bufferedWrite: true, useCompressionStream: false });
        blobList.forEach(blobItem => {
            zipWriter.add(blobItem.filename, new BlobReader(blobItem.blobObject), {signal: nowSignal});
        })
        Download(URL.createObjectURL(await zipWriter.close()), `album_archive_${screenName.value ? screenName.value : 'Search'}_${platform.value}_${Date.now()}.zip`)
    }

}

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