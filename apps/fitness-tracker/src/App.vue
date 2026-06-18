<script setup lang="ts">
import { Flame, Move, ArrowUpRight, Play, Calendar } from 'lucide-vue-next'

const rings = [
  { label: 'Move', color: 'text-rose-500', stroke: '#f43f5e', value: 80 },
  { label: 'Exercise', color: 'text-emerald-500', stroke: '#10b981', value: 65 },
  { label: 'Stand', color: 'text-cyan-500', stroke: '#06b6d4', value: 40 },
]

// SVG config for concentric rings
const radius = 60
const strokeWidth = 14
const center = 100
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans selection:bg-rose-500/30">
    <div class="max-w-md mx-auto h-screen flex flex-col bg-[#0a0a0a] border-x border-neutral-900 shadow-2xl overflow-y-auto custom-scrollbar">
      
      <!-- Header -->
      <header class="p-6 pb-2">
        <h1 class="text-3xl font-black tracking-tight">Summary</h1>
        <p class="text-neutral-500 font-medium">Thursday, Oct 24</p>
      </header>

      <!-- Activity Rings Area -->
      <div class="p-6">
        <div class="bg-neutral-900/50 border border-neutral-800 rounded-[2rem] p-6 flex flex-col items-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-cyan-500/5"></div>
          
          <!-- SVG Rings -->
          <div class="relative w-[200px] h-[200px] mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <!-- Background Tracks -->
              <circle v-for="(ring, i) in rings" :key="'bg'+i"
                :cx="center" :cy="center" :r="radius - (i * (strokeWidth + 2))"
                fill="none" :stroke="ring.stroke" :stroke-width="strokeWidth" stroke-opacity="0.2"
                stroke-linecap="round"
              />
              <!-- Progress Tracks -->
              <circle v-for="(ring, i) in rings" :key="'prog'+i"
                :cx="center" :cy="center" :r="radius - (i * (strokeWidth + 2))"
                fill="none" :stroke="ring.stroke" :stroke-width="strokeWidth"
                stroke-linecap="round"
                :stroke-dasharray="2 * Math.PI * (radius - (i * (strokeWidth + 2)))"
                :stroke-dashoffset="(2 * Math.PI * (radius - (i * (strokeWidth + 2)))) * (1 - ring.value/100)"
                class="transition-all duration-1000 ease-out"
              />
            </svg>
            
            <!-- Center Stats -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <Move class="w-6 h-6 text-rose-500 mb-1" />
            </div>
          </div>

          <!-- Ring Stats List -->
          <div class="w-full space-y-4 relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-8 rounded-full bg-rose-500"></div>
                <div>
                  <p class="font-bold text-rose-500 uppercase tracking-wider text-xs">Move</p>
                  <p class="font-black text-xl">480<span class="text-sm font-medium text-rose-500/50">/600 kcal</span></p>
                </div>
              </div>
              <ArrowUpRight class="w-5 h-5 text-rose-500/50" />
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-8 rounded-full bg-emerald-500"></div>
                <div>
                  <p class="font-bold text-emerald-500 uppercase tracking-wider text-xs">Exercise</p>
                  <p class="font-black text-xl">28<span class="text-sm font-medium text-emerald-500/50">/30 min</span></p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-8 rounded-full bg-cyan-500"></div>
                <div>
                  <p class="font-bold text-cyan-500 uppercase tracking-wider text-xs">Stand</p>
                  <p class="font-black text-xl">6<span class="text-sm font-medium text-cyan-500/50">/12 hrs</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Workouts -->
      <div class="px-6 pb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-lg">Workouts</h2>
          <button class="text-rose-500 font-bold text-sm">Show All</button>
        </div>

        <div class="space-y-3">
          <!-- Workout Card -->
          <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-4 hover:border-rose-500/50 transition-colors cursor-pointer group">
            <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Play class="w-5 h-5 text-emerald-500 ml-0.5" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold truncate">Outdoor Run</h3>
              <p class="text-emerald-500 text-sm font-medium">5.20 km • 32:15</p>
            </div>
            <div class="text-right shrink-0">
              <p class="font-bold text-xl">324</p>
              <p class="text-xs text-neutral-500 font-medium uppercase">Kcal</p>
            </div>
          </div>

          <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-4 hover:border-rose-500/50 transition-colors cursor-pointer group">
            <div class="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Flame class="w-5 h-5 text-cyan-500" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold truncate">HIIT Training</h3>
              <p class="text-cyan-500 text-sm font-medium">15 mins</p>
            </div>
            <div class="text-right shrink-0">
              <p class="font-bold text-xl">180</p>
              <p class="text-xs text-neutral-500 font-medium uppercase">Kcal</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Nav (Fixed) -->
      <nav class="mt-auto border-t border-neutral-900 bg-[#0a0a0a]/90 backdrop-blur-xl flex justify-around p-4 sticky bottom-0 z-20">
        <button class="flex flex-col items-center gap-1 text-rose-500">
          <Activity class="w-6 h-6" />
          <span class="text-[10px] font-bold tracking-wider">Summary</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors">
          <Calendar class="w-6 h-6" />
          <span class="text-[10px] font-bold tracking-wider">History</span>
        </button>
      </nav>

    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none; /* Hide scrollbar for mobile feel */
}
</style>
