import {Tweet} from "@/type/Content";

//TODO fix type
export type TweetMode = string//'timeline' | 'tag' | 'search' | 'status'
export type TweetType = string//'all' | 'self' | 'retweet' | 'media'
export interface userListInterface {name: string; display_name: string; project: string; tag: string}


export interface State {
  now: Date
  userTimeZone: string
  devmode: boolean

  screen_name: string
  userInfo: {
    uid: string
    screen_name: string
    display_name: string
    avatar: string
  }
  platform: 'ns' | 'ps'
  status: 0 | 1 | 2
  loading: boolean
  tweets: Tweet[]
  basePath: string
  twemojiBasePath: string
  mediaPath: string
}
