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
        <h3 class="text-4xl font-sans my-4">{{ date }}</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <router-link class="cursor-pointer bg-slate-300 aspect-video border-2 border-white hover:border hover:border-2 hover:border-sky-700 select-none" v-for="(meta, order) in photos" :key="order" :to="'/photos/' + meta.tweet_id">
            <img v-if="meta.origin_type === 'photo'" :src="mediaPath + meta.url" :alt="meta.filename" />
            <p v-else >This is a video</p>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {request} from "@/share/Fetch";
import {ApiTweets} from "@/type/Api";
import {Media, Tweet} from "@/type/Content";
import {useHead} from "@vueuse/head";
import {useStore} from "@/store";
useHead({title: "Album"})

const state = reactive<{
  loading: boolean
}>({
  loading: true
})

const store = useStore()
const screenName = computed(() => store.state.screen_name)
const platform = computed(() => store.state.platform === 'ns' ? 'nintendo_switch_share' : 'PlayStation®Network') //'nintendo_switch_share'//'PlayStation®Network'
const tweets = computed(() => store.state.tweets)
const basePath = computed(() => store.state.basePath)
const mediaPath = computed(() => store.state.mediaPath)

onMounted(() => {
  //store.updateLoadingStatus(true)
  request<ApiTweets>(basePath.value + "/api/v2/data/search/?count=20&q=source:" + platform.value + " from:" + screenName.value).then(response => {
    store.dispatch('setCoreValue', {key: 'tweets', value: response.data.tweets} )
    state.loading = false
    //store.updateLoadingStatus(false)
  }).catch(e => {
    //store.updateLoadingStatus(false)
    console.error(e)
  })
})

const realData = computed(() => {
  let tmpData: {[p: string]: Media[]} = {}
  tweets.value.map(x => x.mediaObject.map(y => {
    let tmpDate = new Date(x.time * 1000)
    console.log(tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1))
    if (tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)]) {
      tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)].push(y)
    } else {
      tmpData[tmpDate.getFullYear() + '.' + (tmpDate.getMonth() + 1)] = [y]
    }
  }))
  console.log(tmpData)
  return tmpData
})

</script>
