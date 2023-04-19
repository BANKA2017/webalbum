<template>
  <div class="my-10">
    <div class="font-bold text-3xl mb-5">About Game <span class="underline underline-offset-2">Album</span></div>
      <p class="text-lg">Game Album is an online photo album implemented with the <NuxtLink href="https://github.com/BANKA2017/twitter-monitor#cloudflare-workers" target="_blank" class="underline underline-offset-2">Twitter monitor online api</NuxtLink> for viewing or bulk downloading screenshots and videos stored on Twitter and shared from NS/PS/Xbox.</p>
      <h3 class="text-2xl font-bold my-5"><span class="line-through">Unnecessary</span> Q&A</h3>
      <p class="text-lg">Q: Why can't I share screen screenshots/videos to Twitter?</p>
      <p class="text-lg">A: Unfortunately, I don't own any NS/PS/Xbox devices, so I can't answer these kinds of questions. In fact, the idea for this site came from a suggestion from a friend of mine.</p>
      <hr class="my-3" />
      <p class="text-lg">Q: Can I view content shared from outside NS/PS/Xbox?</p>
      <p class="text-lg">A: Unfortunately, No, we only support viewing content that has been shared from NS/PS/Xbox.</p>
      <hr class="my-3" />
      <p class="text-lg">Q: I saw a picture/video I posted with you, how do I ask you to remove it?</p>
      <p class="text-lg">A: We do not have the power to manage users' Twitter accounts, so we cannot delete them. Users can delete the corresponding tweets from Twitter. Alternatively, if you don't want others to see your tweets, my advice is to link your NS/PS/Xbox account to a protected Twitter account, or simply not share them.</p>
      <hr class="my-3" />
      <p class="text-lg">Q: I don't trust you, can I deploy myself?</p>
      <p class="text-lg">A: It's a good idea - don't trust any third party websites, including us. The back end is <NuxtLink href="https://github.com/BANKA2017/twitter-monitor#cloudflare-workers" target="_blank" class="underline underline-offset-2">open source</NuxtLink> and the front end will be open source <span class="underline underline-offset-2 decoration-dotted">soon</span> - when we are ready. If you don't want to deploy it yourself, you can also paste the content below into Twitter's <NuxtLink :href="`https://twitter.com/search?q=${queryContent}&f=live`" class="underline underline-offset-2">search box</NuxtLink> and get the same result.</p>
      <div class="grid grid-cols-2 gap-5 mt-5">
          <div class="col-span-2 lg:col-span-1">
              <input class="form-input rounded-xl w-full" placeholder="Twitter username like '@twitter'" v-model="state.screen_name">
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
          <p>Translated by DeepL, written by <NuxtLink href="https://nest.moe" class="font-bold hover:underline underline-offset-2">MANKA</NuxtLink> with ❤️</p>
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
