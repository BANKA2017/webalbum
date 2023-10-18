export interface UserInfo {
  uid: string
  uid_str: string
  name: string
  display_name: string
  header: string
  banner: number
  following: number
  followers: number
  description: string
  description_original: string
  statuses_count: number
  top: string
  locked: number
  deleted: number
  verified: number
  description_entities: Entity[]
}

export interface Tweet {
  tweet_id: string
  uid: string
  name: string
  display_name: string
  source: string
  time: number
  entities: string[]
  media: Media[]
}

export interface Entity {
  expanded_url: string
  indices_end: number
  indices_start: number
  text: string
  type: 'hashtag' | 'symbol' | 'url' | 'user_mention' | "emoji" | '' //emoji and empty('') are for FullTextToHtml
}

export interface Media {
  tweet_id: number
  uid: number
  cover: string
  url: string
  extension: string
  filename: string
  original_type: string
  source: string
  content_type: string
  original_info_height: number
  original_info_width: number
  title?: string | null
  description?: string | null
  blurhash: string | null
  index?: number
}

export type MediaSize = 'large' | 'medium' | 'small' | 'thumb' | 'tiny' | 'orig'
