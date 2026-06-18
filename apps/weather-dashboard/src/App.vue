<script setup lang="ts">
import { CloudRain, Wind, Droplets, Sun, Cloud, ThermometerSun, MapPin } from 'lucide-vue-next'

const forecast = [
  { day: 'Mon', temp: 24, icon: Sun },
  { day: 'Tue', temp: 22, icon: Cloud },
  { day: 'Wed', temp: 19, icon: CloudRain },
  { day: 'Thu', temp: 21, icon: Sun },
  { day: 'Fri', temp: 25, icon: Sun },
  { day: 'Sat', temp: 23, icon: Cloud },
  { day: 'Sun', temp: 20, icon: CloudRain },
]
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 sm:p-8 font-sans bg-[#0a0a0a]">
    <!-- Main Widget Container -->
    <div class="relative w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-900/20 bg-neutral-900 border border-neutral-800">
      
      <!-- Dynamic Background Gradient (Simulating Rain/Cloudy) -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-700 via-indigo-900 to-slate-900 opacity-90"></div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 flex flex-col h-full text-white p-8">
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-12">
          <div class="flex items-center gap-2 text-indigo-100">
            <MapPin class="w-5 h-5" />
            <span class="font-bold tracking-wide">Seoul, KR</span>
          </div>
          <button class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
            <Search class="w-5 h-5" />
          </button>
        </div>

        <!-- Current Weather -->
        <div class="flex flex-col items-center mb-12">
          <CloudRain class="w-32 h-32 text-indigo-200 mb-6 drop-shadow-2xl animate-pulse" style="animation-duration: 4s;" />
          <h1 class="text-7xl font-black tracking-tighter mb-2">19°</h1>
          <p class="text-xl text-indigo-200 font-medium tracking-wide">Heavy Rain</p>
        </div>

        <!-- Stats Row -->
        <div class="grid grid-cols-3 gap-4 mb-10 bg-black/20 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
          <div class="flex flex-col items-center gap-2">
            <Wind class="w-5 h-5 text-indigo-300" />
            <span class="text-sm font-bold">12 km/h</span>
            <span class="text-xs text-indigo-200/70">Wind</span>
          </div>
          <div class="flex flex-col items-center gap-2 border-x border-white/10">
            <Droplets class="w-5 h-5 text-indigo-300" />
            <span class="text-sm font-bold">84%</span>
            <span class="text-xs text-indigo-200/70">Humidity</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <ThermometerSun class="w-5 h-5 text-indigo-300" />
            <span class="text-sm font-bold">16°</span>
            <span class="text-xs text-indigo-200/70">Feels like</span>
          </div>
        </div>

        <!-- 7-Day Forecast -->
        <div class="mt-auto">
          <h3 class="text-sm font-bold text-indigo-200/80 mb-4 px-2 uppercase tracking-wider">7-Day Forecast</h3>
          <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x px-2">
            <div 
              v-for="day in forecast" 
              :key="day.day"
              class="snap-center shrink-0 flex flex-col items-center gap-3 bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 w-16"
            >
              <span class="text-xs font-bold text-indigo-200">{{ day.day }}</span>
              <component :is="day.icon" class="w-6 h-6" :class="day.icon === Sun ? 'text-amber-400' : 'text-indigo-200'" />
              <span class="text-sm font-bold">{{ day.temp }}°</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Search } from 'lucide-vue-next'
</script>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
</style>
