<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Search, Mic, Video, Bell, ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, PlayCircle } from 'lucide-vue-next'

const recommendations = Array(8).fill(null).map((_, i) => ({
  id: i,
  title: `Building a Modern Vue 3 Application from Scratch - Part ${i + 1}`,
  channel: 'Frontend Masters',
  views: `${Math.floor(Math.random() * 900 + 100)}K`,
  time: `${Math.floor(Math.random() * 11 + 1)} months ago`,
  duration: `${Math.floor(Math.random() * 15 + 5)}:${Math.floor(Math.random() * 50 + 10).toString().padStart(2, '0')}`,
  thumb: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=225&sig=${i}`
}))

const isDescriptionExpanded = ref(false)
</script>

<template>
  <div class="min-h-screen bg-[#0F0F0F] text-[#F1F1F1] font-sans">
    
    <!-- Navbar -->
    <header class="h-14 flex items-center justify-between px-4 sticky top-0 bg-[#0F0F0F] z-50">
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
          <Menu class="w-6 h-6" />
        </button>
        <div class="flex items-center gap-1 cursor-pointer">
          <PlayCircle class="w-8 h-8 text-red-500" />
          <span class="text-xl font-bold tracking-tighter hidden sm:block">YouTube</span>
        </div>
      </div>

      <div class="flex items-center gap-4 flex-1 max-w-[720px] ml-10 mr-4">
        <div class="flex flex-1 items-center bg-[#121212] border border-[#303030] rounded-full overflow-hidden focus-within:border-[#1C62B9] ml-4">
          <div class="pl-4 pr-2 py-2 hidden sm:block border-r border-transparent"><Search class="w-5 h-5 text-transparent" /></div>
          <input type="text" placeholder="Search" class="flex-1 bg-transparent border-none outline-none px-4 py-2 text-[15px]" />
          <button class="bg-[#222222] border-l border-[#303030] px-5 py-2 hover:bg-[#303030] transition-colors">
            <Search class="w-5 h-5 text-neutral-400" />
          </button>
        </div>
        <button class="w-10 h-10 bg-[#222222] hover:bg-[#303030] rounded-full flex items-center justify-center shrink-0 transition-colors hidden sm:flex">
          <Mic class="w-5 h-5" />
        </button>
      </div>

      <div class="flex items-center gap-2 sm:gap-4 shrink-0">
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"><Video class="w-6 h-6" /></button>
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors hidden md:block"><Bell class="w-6 h-6" /></button>
        <button class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm ml-2">C</button>
      </div>
    </header>

    <main class="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
      
      <!-- Primary Column (Video + Info) -->
      <div class="flex-1 min-w-0">
        <!-- Video Player Placeholder -->
        <div class="w-full aspect-video bg-black rounded-xl overflow-hidden relative group">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600" class="w-full h-full object-cover opacity-80" />
          
          <!-- Mock Progress Bar -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:h-1.5 transition-all cursor-pointer">
            <div class="h-full bg-red-500 w-1/3 relative">
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Video Info -->
        <div class="mt-4">
          <h1 class="text-xl font-bold mb-3 line-clamp-2">Vue 3 Composition API & Tailwind CSS v4 Masterclass - Build 10 Apps in 1 Hour</h1>
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <!-- Channel Info -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">FM</div>
              <div>
                <h3 class="font-bold text-[15px] leading-tight">Frontend Masters</h3>
                <p class="text-xs text-[#AAAAAA]">1.24M subscribers</p>
              </div>
              <button class="ml-4 bg-[#F1F1F1] text-[#0F0F0F] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#D9D9D9] transition-colors">Subscribe</button>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar shrink-0">
              <div class="flex items-center bg-[#272727] hover:bg-[#3F3F3F] rounded-full transition-colors h-9">
                <button class="flex items-center gap-2 px-4 py-2 border-r border-[#3F3F3F]"><ThumbsUp class="w-5 h-5" /> <span class="text-sm font-medium">12K</span></button>
                <button class="px-4 py-2"><ThumbsDown class="w-5 h-5" /></button>
              </div>
              <button class="flex items-center gap-2 bg-[#272727] hover:bg-[#3F3F3F] px-4 py-2 rounded-full transition-colors h-9">
                <Share2 class="w-5 h-5" /> <span class="text-sm font-medium">Share</span>
              </button>
              <button class="flex items-center gap-2 bg-[#272727] hover:bg-[#3F3F3F] px-4 py-2 rounded-full transition-colors h-9 hidden md:flex">
                <Download class="w-5 h-5" /> <span class="text-sm font-medium">Download</span>
              </button>
              <button class="w-9 h-9 bg-[#272727] hover:bg-[#3F3F3F] rounded-full flex items-center justify-center transition-colors shrink-0">
                <MoreHorizontal class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Description Container -->
        <div 
          class="mt-4 bg-[#272727] hover:bg-[#3F3F3F] transition-colors rounded-xl p-3 text-sm cursor-pointer"
          @click="isDescriptionExpanded = !isDescriptionExpanded"
        >
          <div class="font-bold mb-1">124K views  1 month ago  <span class="text-[#3EA6FF]">#Vue #Tailwind #WebDev</span></div>
          <div class="text-[#F1F1F1] whitespace-pre-wrap" :class="{ 'line-clamp-2': !isDescriptionExpanded }">
Welcome to the ultimate frontend masterclass! In this video, we will build 10 complex applications using Vue 3 Composition API and Tailwind CSS v4.

Timestamps:
0:00 Introduction
5:30 Crypto Dashboard
25:15 Fitness Tracker
45:00 Kanban Board

Source code available on GitHub!
          </div>
          <button class="font-bold mt-2">{{ isDescriptionExpanded ? 'Show less' : '...more' }}</button>
        </div>

        <!-- Comments Placeholder -->
        <div class="mt-6 hidden lg:block">
          <h3 class="font-bold text-xl mb-4">4,231 Comments</h3>
          <div class="flex gap-4">
            <div class="w-10 h-10 bg-purple-600 rounded-full shrink-0"></div>
            <div class="flex-1 border-b border-[#303030] pb-1">
              <input type="text" placeholder="Add a comment..." class="w-full bg-transparent outline-none py-1" />
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Column (Recommendations) -->
      <div class="w-full lg:w-[400px] shrink-0 flex flex-col gap-3">
        <!-- Filter Pills -->
        <div class="flex gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x">
          <button class="bg-[#F1F1F1] text-[#0F0F0F] px-3 py-1.5 rounded-lg text-sm font-medium shrink-0 snap-center">All</button>
          <button class="bg-[#272727] hover:bg-[#3F3F3F] text-[#F1F1F1] px-3 py-1.5 rounded-lg text-sm font-medium shrink-0 snap-center transition-colors">Vue.js</button>
          <button class="bg-[#272727] hover:bg-[#3F3F3F] text-[#F1F1F1] px-3 py-1.5 rounded-lg text-sm font-medium shrink-0 snap-center transition-colors">Frontend Web Development</button>
          <button class="bg-[#272727] hover:bg-[#3F3F3F] text-[#F1F1F1] px-3 py-1.5 rounded-lg text-sm font-medium shrink-0 snap-center transition-colors">Related</button>
        </div>

        <!-- Video Items -->
        <div v-for="rec in recommendations" :key="rec.id" class="flex gap-2 group cursor-pointer">
          <div class="w-40 aspect-video bg-[#272727] rounded-lg shrink-0 overflow-hidden relative">
            <img :src="rec.thumb" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <span class="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 text-xs font-bold rounded">{{ rec.duration }}</span>
          </div>
          <div class="flex flex-col flex-1 py-0.5">
            <h4 class="text-sm font-bold leading-tight line-clamp-2 mb-1 group-hover:text-[#3EA6FF]">{{ rec.title }}</h4>
            <span class="text-xs text-[#AAAAAA]">{{ rec.channel }}</span>
            <span class="text-xs text-[#AAAAAA]">{{ rec.views }} views • {{ rec.time }}</span>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

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
  background: #71717A;
  border-radius: 4px;
}
</style>
