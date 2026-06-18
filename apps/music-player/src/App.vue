<script setup lang="ts">
import { usePlayerStore } from './lib/store'
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-vue-next'

const store = usePlayerStore()

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const onSeek = (e: Event) => {
  const target = e.target as HTMLInputElement
  store.seek(Number(target.value))
}
</script>

<template>
  <div class="flex flex-col h-screen bg-neutral-950 text-neutral-100 font-sans select-none">
    
    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar Placeholder -->
      <div class="w-64 bg-black p-6 hidden md:flex flex-col">
        <h1 class="font-black text-2xl tracking-tighter mb-8">Spooofy</h1>
        <div class="space-y-4 text-neutral-400 font-bold text-sm">
          <p class="hover:text-white cursor-pointer transition-colors">Home</p>
          <p class="hover:text-white cursor-pointer transition-colors">Search</p>
          <p class="hover:text-white cursor-pointer transition-colors">Your Library</p>
        </div>
      </div>

      <!-- Track List -->
      <div class="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-900/40 to-neutral-950 p-6 sm:p-8 custom-scrollbar">
        <div class="flex items-end gap-6 mb-10 mt-10">
          <div class="w-48 h-48 bg-neutral-800 shadow-2xl rounded-lg overflow-hidden shrink-0">
            <img :src="store.currentTrack.value.cover" class="w-full h-full object-cover mix-blend-overlay" />
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-indigo-300">Playlist</span>
            <h2 class="text-5xl sm:text-7xl font-black mt-2 mb-6">Daily Mix</h2>
            <p class="text-neutral-400 font-medium">Made for you • {{ store.tracks.length }} tracks</p>
          </div>
        </div>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-neutral-400 text-sm border-b border-neutral-800/50">
              <th class="py-2 px-4 font-normal w-12 text-center">#</th>
              <th class="py-2 px-4 font-normal">Title</th>
              <th class="py-2 px-4 font-normal hidden sm:table-cell">Album</th>
              <th class="py-2 px-4 font-normal text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(track, idx) in store.tracks" 
              :key="track.id"
              @click="store.playTrack(track)"
              class="group hover:bg-white/5 transition-colors cursor-pointer"
              :class="store.currentTrack.value.id === track.id ? 'text-indigo-400' : ''"
            >
              <td class="py-3 px-4 text-center rounded-l-lg">
                <span v-if="store.currentTrack.value.id === track.id && store.isPlaying.value">
                  <div class="flex gap-1 justify-center items-end h-4">
                    <div class="w-1 bg-indigo-400 h-full animate-pulse"></div>
                    <div class="w-1 bg-indigo-400 h-2/3 animate-pulse" style="animation-delay: 150ms"></div>
                    <div class="w-1 bg-indigo-400 h-1/2 animate-pulse" style="animation-delay: 300ms"></div>
                  </div>
                </span>
                <span v-else>{{ idx + 1 }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <img :src="track.cover" class="w-10 h-10 rounded shrink-0 hidden sm:block" />
                  <div>
                    <p class="font-medium text-white group-hover:underline line-clamp-1" :class="{ 'text-indigo-400': store.currentTrack.value.id === track.id }">{{ track.title }}</p>
                    <p class="text-sm text-neutral-400 group-hover:text-neutral-300 line-clamp-1">{{ track.artist }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 text-sm text-neutral-400 hidden sm:table-cell">{{ track.album }}</td>
              <td class="py-3 px-4 text-sm text-right rounded-r-lg">{{ formatTime(track.duration) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bottom Player Bar -->
    <div class="h-24 bg-[#181818] border-t border-neutral-800 flex items-center justify-between px-4 sm:px-6 shrink-0 z-20">
      
      <!-- Current Track Info -->
      <div class="flex items-center gap-4 w-1/3 min-w-0">
        <img :src="store.currentTrack.value.cover" class="w-14 h-14 rounded-md shadow-lg" />
        <div class="min-w-0 hidden sm:block">
          <p class="font-bold text-sm text-white truncate">{{ store.currentTrack.value.title }}</p>
          <p class="text-xs text-neutral-400 truncate">{{ store.currentTrack.value.artist }}</p>
        </div>
        <button class="text-neutral-400 hover:text-white hidden md:block"><Heart class="w-4 h-4" /></button>
      </div>

      <!-- Controls -->
      <div class="flex flex-col items-center justify-center max-w-xl w-full px-4">
        <div class="flex items-center gap-6 mb-2">
          <button class="text-neutral-400 hover:text-white hidden sm:block"><Shuffle class="w-4 h-4" /></button>
          <button @click="store.prevTrack" class="text-neutral-400 hover:text-white"><SkipBack class="w-5 h-5 fill-current" /></button>
          <button @click="store.togglePlay" class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform">
            <Pause v-if="store.isPlaying.value" class="w-4 h-4 fill-current" />
            <Play v-else class="w-4 h-4 fill-current ml-0.5" />
          </button>
          <button @click="store.nextTrack" class="text-neutral-400 hover:text-white"><SkipForward class="w-5 h-5 fill-current" /></button>
          <button class="text-neutral-400 hover:text-white hidden sm:block"><Repeat class="w-4 h-4" /></button>
        </div>
        
        <!-- Progress Bar -->
        <div class="flex items-center w-full gap-2 text-xs text-neutral-400 font-medium">
          <span>{{ formatTime(store.progress.value) }}</span>
          <input 
            type="range" 
            :min="0" 
            :max="store.currentTrack.value.duration" 
            :value="store.progress.value"
            @input="onSeek"
            class="flex-1 h-1 bg-neutral-600 rounded-full appearance-none outline-none hover:bg-indigo-500 cursor-pointer accent-indigo-500"
          />
          <span>{{ formatTime(store.currentTrack.value.duration) }}</span>
        </div>
      </div>

      <!-- Volume -->
      <div class="flex items-center justify-end gap-2 w-1/3 hidden md:flex">
        <Volume2 class="w-4 h-4 text-neutral-400" />
        <input 
          type="range" 
          v-model="store.volume.value" 
          :min="0" 
          :max="100"
          class="w-24 h-1 bg-neutral-600 rounded-full appearance-none outline-none hover:bg-indigo-500 cursor-pointer accent-indigo-500"
        />
      </div>

    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #555;
}

/* Custom Range Slider Styling cross-browser */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
}
</style>
