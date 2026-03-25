// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

   nitro: {
    preset: 'cloudflare-pages',
    output: {
      dir: 'dist',
      publicDir: 'dist'
    }
  },
  runtimeConfig: {
    ipApiKey: process.env.NUXT_IP_API_KEY,
    public: {
    ipBaseUrl: process.env.NUXT_PUBLIC_IP_BASE_URL,
    }
},

  modules: ["@nuxt/image"],
})