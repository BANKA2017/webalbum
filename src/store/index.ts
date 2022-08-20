/* 先填写 .env.local */
import { InjectionKey } from 'vue'
import {createStore, useStore as baseUseStore, Store, ActionContext} from 'vuex'
import {State} from "@/type/State";
import {Tweet} from "@/type/Content";
import {request} from "@/share/Fetch";
import {ApiUserInfo} from "@/type/Api";

const devmode = process.env.NODE_ENV === "development"
const basePath = !devmode ? import.meta.env.VITE_BASE_PATH : import.meta.env.VITE_BASE_PATH
const twemojiBasePath = import.meta.env.VITE_TW_EMOJI_PATH//twemoji
const mediaPath = import.meta.env.VITE_MEDIA_PATH

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    now: new Date(),
    userTimeZone: '',
    devmode: false,

    screen_name: '',
    userInfo: {
      uid: '0',
      screen_name: '',
      display_name: '',
      avatar: '',
    },
    platform: 'ns',
    status: 0,
    loading: true,
    tweets: [],
    basePath,
    twemojiBasePath,
    mediaPath
  },
  mutations: {
    updateNow: (state, payload) => {
      state.now = payload.now
    },
    setUserTimeZone: (state, payload) => {
      state.userTimeZone = payload.userTimeZone
    },
    //set core data
    setCoreValue: <K extends keyof State>(state: State, payload: {key: K; value: State[K]}) => {
      state[payload.key] = payload.value
    },
    updatePlatform: (state, payload: {platform: 'ns' | 'ps'}) => {
      state.platform = payload.platform
    },
    updateTweets(state, payload: { tweets: Tweet[] }) {
      state.tweets = [...state.tweets, ...payload.tweets]
    }
  },
  actions: {
    updateNow: (context) => {
      context.commit({type: 'updateNow', now: new Date()})
    },
    setUserTimeZone: (context) => {
      let timeValue = (new Date().getTimezoneOffset() / 60) * (-1);
      context.commit({type: 'setUserTimeZone', userTimeZone: (timeValue >= 0 ? '+' + timeValue.toString() : timeValue.toString())})
    },
    //set core data
    setCoreValue: <K extends keyof State>(context: ActionContext<State, State>, payload: {key: K; value: State[K]}) => {
      context.commit('setCoreValue', {key: payload.key, value: payload.value})
    },
    pushCoreValue: (context: any, payload) => {
      context.commit({type: 'setCoreValue', key: payload.key, value: context.state[payload.key].concat(payload.value)})
    },
    updatePlatform(context: ActionContext<State, State>, payload: 'ns' | 'ps') {
      context.commit({type: 'updatePlatform', platform: payload})
    },
    updateLoadingStatus(context: ActionContext<State, State>, payload: boolean) {
      context.commit({type: 'setCoreValue', payload: {key: 'loading', value: payload}})
    },
    updateTweets(context: ActionContext<State, State>, payload: Tweet[]) {
      context.commit({type: 'updateTweets', tweets: payload})
    },
  }
})

export function useStore () {
  return baseUseStore(key)
}
