// https://nuxt.com/docs/api/configuration/nuxt-config
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

export default defineNuxtConfig({
  ssr: false,
  devServer: {
    host: '0.0.0.0'
  },
  runtimeConfig: {
    public: {
      NUXT_BASE_PATH: process.env.NUXT_BASE_PATH,
      NUXT_MEDIA_PATH: process.env.NUXT_MEDIA_PATH,
      NUXT_GA_ID: process.env.NUXT_GA_ID,
    }
  },
  modules: [
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
        ],
      },
    ],
  ],
  imports: {
    dirs: ['./stores']
  },
  experimental: {
    payloadExtraction: false
  },
})
