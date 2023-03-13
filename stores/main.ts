
//TODO typescript interface
import {State} from "~/type/State";

export const useMainStore = defineStore('main', {
  state: (): State => ({
    now: new Date(),
    dark: '0',
    userTimeZone: '',

    screen_name: '',
    hashtags_count: 20,
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
    maxId: '0',
    hasmore: false,
  }),
  actions: {
    updateNow() {
      this.now = new Date()
    },
    updateCoreValue<K extends keyof State>(key: K, value: State[K]) {
      this.$state[key] = value
    },
  }
})