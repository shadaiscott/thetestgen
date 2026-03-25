<template>
  <ClientOnly>
  <div class="min-h-screen w-full relative overflow-hidden">
    <!-- Background gradient -->
    <div
      class="absolute inset-0 z-0"
      style="background: radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%);"
    />
    <!-- Page content sits above the gradient -->
    <div class="relative z-10">
      <NuxtPage />
    </div>
  </div>
  </ClientOnly>
</template>


<script setup>
import '~/assets/main.css'
</script>