<template>
  <div class="mt-6 max-w-2xl mx-auto w-full px-4">

    <!-- Search Form -->
    <form @submit.prevent="handleSearch">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          class="block w-full p-4 ps-8 text-base text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          placeholder="Enter an IP address e.g. 8.8.8.8"
          :disabled="loading"
        />
        <button
          type="submit"
          :disabled="loading"
          class="text-white absolute end-2 bottom-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span v-if="!loading">Search</span>
          <span v-else>Searching...</span>
        </button>
      </div>
      <span class="block mt-5 text-center text-sm text-gray-400">
        Powered by IP Locate
      </span>
    </form>

    <!-- Error -->
    <div v-if="error" class="mt-4">
      <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
        {{ error }}
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="mt-8">
      <div class="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-500 text-sm">Fetching IP intelligence...</p>
      </div>
    </div>

    <!-- Results -->
    <div v-if="result && !loading" class="mt-8 space-y-4">

      <!-- IP Header -->
     <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
  <div class="flex items-center justify-between flex-wrap gap-3">
    <div class="min-w-0">
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">IP Address</p>
      <p class="text-3xl font-bold text-gray-900 break-all">{{ result.ip }}</p>
    </div>
    <div class="flex items-center gap-2 flex-wrap">
      <span v-if="result.privacy.is_abuser" class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Threat Detected</span>
      <span v-if="result.privacy.is_proxy" class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Proxy / VPN</span>
      <span v-if="!result.privacy.is_abuser && !result.privacy.is_proxy" class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Clean</span>
    </div>
  </div>
</div>

      <!-- Info Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <!-- Location -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div class="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
            </svg>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</p>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">City</span>
              <span class="font-medium text-gray-900">{{ result.city || 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Region</span>
              <span class="font-medium text-gray-900">{{ result.subdivision || 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Country</span>
              <span class="font-medium text-gray-900">{{ result.country || 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Coordinates</span>
              <span class="font-medium text-gray-900">{{ result.latitude }}, {{ result.longitude }}</span>
            </div>
          </div>
        </div>

        <!-- Network -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div class="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"/>
            </svg>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Network</p>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">ISP</span>
              <span class="font-medium text-gray-900 text-right max-w-[60%] truncate">{{ result.asn.name|| 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">ASN</span>
              <span class="font-medium text-gray-900">{{ result.asn?.asn || 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Timezone</span>
              <span class="font-medium text-gray-900">{{ result.time_zone || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- Security Signals -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>
            </svg>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Security Signals</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              v-for="signal in securitySignals"
              :key="signal.label"
              class="flex flex-col items-center justify-center p-3 rounded-lg border text-center gap-1"
              :class="signal.active ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'"
            >
              <span class="text-xs font-semibold" :class="signal.active ? 'text-red-600' : 'text-gray-400'">
                {{ signal.active ? 'Yes' : 'No' }}
              </span>
              <span class="text-xs text-gray-500">{{ signal.label }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'



interface IpResult {
  ip: string
  city: string
  subdivision: string
  country: string
  latitude: number
  longitude: number
  time_zone: string
  asn: {
    asn: string
    name: string
  }
  privacy: {
    is_proxy: boolean
    is_tor: boolean
    is_abuser: boolean
    is_bogon: boolean
  }
}

const result = ref<IpResult | null>(null)
const searchQuery = ref('')
const loading = ref(false)
const error = ref('')



const securitySignals = computed(() => [
  { label: 'Proxy / VPN', active: result.value?.privacy.is_proxy?? false },
  { label: 'Tor Exit Node', active: result.value?.privacy.is_tor ?? false },
  { label: 'Threat', active: result.value?.privacy.is_abuser ?? false },
  { label: 'Bogon IP', active: result.value?.privacy.is_bogon ?? false },
])

async function handleSearch() {
  error.value = ''
  result.value = null

  const ip = searchQuery.value.trim()

  if (ip && !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
    error.value = 'Please enter a valid IPv4 address e.g. 8.8.8.8'
    return
  }

  loading.value = true

  try {
    const data = await $fetch<IpResult>(`/api/ip`, {
      query: { ip: ip || '' }
    })

    result.value = data

  } catch (err: any) {
    error.value = err.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>