<template>
  <div class="my-10">
    <div class="font-bold text-3xl mb-5">About Game <span class="underline underline-offset-2">Album</span></div>
      <p class="text-lg">Game Album is an online album based on <NuxtLink href="https://github.com/BANKA2017/twitter-monitor#cloudflare-workers" target="_blank" class="underline underline-offset-2">Twitter monitor online api</NuxtLink>, used to view and download screenshots and videos sent to Twitter through NS/PS/Xbox sharing services.</p>
      <h3 class="text-2xl font-bold my-5"><span class="line-through">Unnecessary</span> Q&A</h3>
      <p class="text-lg">Q: Can I view media that was not sent from NS/PS/Xbox?</p>
      <p class="text-lg">A: Unfortunately, no. We can only view screenshots/videos shared from the NS/PS/Xbox sharing services.</p>
      <hr class="my-3" />
      <p class="text-lg">Q: Are you open source?</p>
      <p class="text-lg">A: Yes, our backend is <NuxtLink href="https://github.com/BANKA2017/twitter-monitor/tree/node/apps/cfworkers" target="_blank" class="underline underline-offset-2">open source</NuxtLink> and the frontend will also be open sourced <span class="underline underline-offset-2 decoration-dotted">soon</span>.</p>
      <hr class="my-3" />
      <p class="text-lg">Q: I see the screenshots/videos I sent here, how do I request for you to delete them?</p>
      <p class="text-lg">A: We are unable to delete this content as we do not have control over the tweets. In fact, anyone can easily find these contents through a simple search command (please check the components below). We suggest that you bind your NS/PS/Xbox to a protected Twitter account or simply refrain from sharing screenshots.</p>
      <hr class="my-3" />
      <p class="text-lg">Q: Can I view these tweets directly on Twitter?</p>
      <p class="text-lg">A: Yes, you can. Fill in the information below and <NuxtLink :href="`https://twitter.com/search?q=${queryContent}&f=live`" class="underline underline-offset-2">click here</NuxtLink>.</p>
      <div class="grid grid-cols-2 gap-5 mt-5">
          <div class="col-span-2 lg:col-span-1">
              <input class="form-input rounded-xl w-full" placeholder="Twitter username like @twitter" v-model="state.screen_name">
              <div class="grid grid-cols-3 mt-5 gap-2">
                  <div @click="state.platform = 'ns'" :class="{'col-span-3': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#E60012]': state.platform === 'ns', 'text-white': state.platform === 'ns', 'border-2': true, 'border-[#E60012]': state.platform !== 'ns',}">Nintendo Switch</div>
                  <div @click="state.platform = 'ps'" :class="{'col-span-3': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#0070D1]': state.platform === 'ps', 'text-white': state.platform === 'ps', 'border-2': true, 'border-[#0070D1]': state.platform !== 'ps',}">PlayStation</div>
                  <div @click="state.platform = 'xbox'" :class="{'col-span-3': true, 'lg:col-span-1': true, 'cursor-pointer': true, 'w-full': true, 'py-2': true, 'px-5': true, 'bg-[#107C10]': state.platform === 'xbox', 'text-white': state.platform === 'xbox', 'border-2': true, 'border-[#107C10]': state.platform !== 'xbox',}">Xbox</div>
              </div>
          </div>
          <div class="p-5 rounded-xl bg-gray-100 font-mono col-span-2 lg:col-span-1">{{queryContent}}</div>
      </div>

      <h3 class="text-2xl font-bold my-5">Donating</h3>
      <ul>
          <li class="text-lg"><span class="font-bold">Patreon</span>: <NuxtLink href="https://www.patreon.com/banka2017" target="_blank" class="underline underline-offset-2">https://patreon.com/banka2017</NuxtLink></li>
      </ul>

      <div class=" flex flex-col items-end mt-5 mb-14 text-sm">
          <p>Translated by OpenAI gpt-3.5, written by <NuxtLink href="https://nest.moe" class="font-bold hover:underline underline-offset-2">MANKA</NuxtLink> with ❤️</p>
      </div>
  </div>
</template>

<script setup lang="ts">
import {useMainStore} from "~/stores/main";

useHead({
  title: 'About'
})
const store = useMainStore()
const platform = computed(() => store.platform) //'nintendo_switch_share'//'PlayStation®Network'

const state = reactive<{
  screen_name: string,
  platform: 'ns' | 'ps' | 'xbox'
}>({
  screen_name: '',
  platform: 'ns'
})

const queryContent = computed(() => {
  const name = state.screen_name.startsWith('@') ? state.screen_name.slice(1) : state.screen_name
  const platformList = {ns: 'nintendo_switch_share', ps: 'PlayStation®Network', xbox: 'xbox_one_social', xbox_game_bar: "xbox_game_bar"}
  const platform = ['ns', 'ps', 'xbox'].includes(state.platform) ? platformList[state.platform] : platformList['ns']
  const queryArray = ['filter:twimg OR filter:consumer_video OR filter:pro_video', `source:${platform}`]
  if (platform === 'xbox_one_social') {
    queryArray.push(`OR source:xbox_game_bar`)//for game bar
  }
  if (name !== '') {
    queryArray.push(`from:${name}`)
  }
  return queryArray.join(' ')
})

definePageMeta({
  layout: "web-album",
})
</script>
