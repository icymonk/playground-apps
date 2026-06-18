<script setup lang="ts">
import { Search, Map as MapIcon, Star, Heart, Menu, Globe, UserCircle, Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next'


const properties = [
  { id: 1, title: 'Luxury Villa with Infinite Pool', location: 'Santorini, Greece', distance: '1,200 km away', date: 'Nov 1 - 8', price: 450, rating: 4.98, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Modern Treehouse in the Forest', location: 'Bali, Indonesia', distance: '5,400 km away', date: 'Dec 12 - 19', price: 180, rating: 4.85, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Oceanfront Glass House', location: 'Malibu, California', distance: '8,100 km away', date: 'Oct 15 - 22', price: 850, rating: 4.95, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Cozy Cabin in the Snow', location: 'Zermatt, Switzerland', distance: '4,300 km away', date: 'Jan 5 - 12', price: 320, rating: 4.92, image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Historic Castle Stay', location: 'Edinburgh, UK', distance: '2,100 km away', date: 'Nov 20 - 27', price: 650, rating: 4.88, image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=600' },
  { id: 6, title: 'Desert Oasis Retreat', location: 'Dubai, UAE', distance: '3,800 km away', date: 'Feb 10 - 17', price: 550, rating: 4.91, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600' },
]

const categories = ['Castles', 'Amazing pools', 'Beachfront', 'Cabins', 'Design', 'Arctic', 'Camping', 'Trending']
</script>

<template>
  <div class="h-screen flex flex-col bg-white text-[#222222] font-sans selection:bg-rose-500/30 overflow-hidden">
    
    <!-- Header -->
    <header class="h-20 border-b border-neutral-200 px-6 lg:px-10 flex items-center justify-between shrink-0 bg-white z-20">
      <div class="text-rose-500 font-black text-2xl tracking-tighter flex items-center gap-1">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 32px; width: 32px; fill: currentcolor;"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.615l-.28.019-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.266 5.09-10.861 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354-2.295-2.938-3.855-6.45-3.855-8.91 0-2.913 1.933-5.386 5.178-5.42 3.223.034 5.156 2.507 5.156 5.42 0 2.456-1.555 5.959-3.837 8.909C19.256 27.766 21.37 29 23.143 29c2.446 0 4.357-1.605 4.357-4.478l-.001-.211-.01-.35c-.046-.58-.192-1.166-.621-2.235l-.342-.835c-.976-2.267-5.115-10.929-7.039-14.698l-.523-1.007C18.053 3.539 17.24 3 16 3zm0 19c-1.739 0-3.103-1.199-3.103-2.946 0-1.74 1.362-2.946 3.103-2.946 1.741 0 3.104 1.206 3.104 2.946 0 1.747-1.363 2.946-3.104 2.946z"></path></svg>
        airbns
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex items-center border border-neutral-200 rounded-full shadow-sm hover:shadow-md transition-shadow py-2 px-2 text-sm font-medium">
        <button class="px-4 border-r border-neutral-200">Anywhere</button>
        <button class="px-4 border-r border-neutral-200">Any week</button>
        <button class="px-4 text-neutral-500 font-normal">Add guests</button>
        <div class="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white ml-2">
          <Search class="w-4 h-4" />
        </div>
      </div>

      <!-- User Menu -->
      <div class="flex items-center gap-4">
        <button class="hidden lg:block text-sm font-medium hover:bg-neutral-100 px-4 py-2 rounded-full transition-colors">Airbnb your home</button>
        <button class="p-2 hover:bg-neutral-100 rounded-full transition-colors"><Globe class="w-5 h-5" /></button>
        <button class="flex items-center gap-2 border border-neutral-200 rounded-full p-1 pl-3 hover:shadow-md transition-shadow">
          <Menu class="w-4 h-4" />
          <UserCircle class="w-8 h-8 text-neutral-500" />
        </button>
      </div>
    </header>

    <!-- Subheader (Categories) -->
    <div class="h-20 px-6 lg:px-10 flex items-center gap-6 shrink-0 bg-white border-b border-neutral-200 shadow-[0_4px_10px_-10px_rgba(0,0,0,0.1)] z-10">
      <div class="flex-1 overflow-x-auto custom-scrollbar flex items-center gap-8 font-medium text-sm text-neutral-500">
        <button 
          v-for="(cat, i) in categories" :key="cat"
          class="flex flex-col items-center gap-2 pb-2 border-b-2 transition-colors whitespace-nowrap"
          :class="i === 0 ? 'border-black text-black' : 'border-transparent hover:border-neutral-300 hover:text-black'"
        >
          <MapIcon class="w-6 h-6 opacity-80" />
          {{ cat }}
        </button>
      </div>
      <button class="hidden md:flex items-center gap-2 border border-neutral-200 px-4 py-2 rounded-xl text-sm font-medium hover:border-black transition-colors shrink-0">
        <Filter class="w-4 h-4" /> Filters
      </button>
    </div>

    <!-- Main Content Split -->
    <main class="flex-1 flex overflow-hidden">
      
      <!-- List View (Left) -->
      <div class="flex-1 lg:w-[60%] lg:flex-none overflow-y-auto p-6 custom-scrollbar relative">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="property in properties" :key="property.id" class="group cursor-pointer">
            <!-- Image Carousel -->
            <div class="relative aspect-[20/19] rounded-xl overflow-hidden mb-3">
              <img :src="property.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button class="absolute top-3 right-3 text-white hover:scale-110 transition-transform drop-shadow-md">
                <Heart class="w-6 h-6" />
              </button>
              
              <!-- Carousel Arrows -->
              <div class="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors hover:scale-105"><ChevronLeft class="w-5 h-5" /></button>
                <button class="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors hover:scale-105"><ChevronRight class="w-5 h-5" /></button>
              </div>
              
              <!-- Pagination Dots -->
              <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div class="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                <div class="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
              </div>
            </div>

            <!-- Info -->
            <div class="flex justify-between items-start">
              <div class="flex flex-col">
                <span class="font-bold truncate text-[15px] leading-tight">{{ property.location }}</span>
                <span class="text-neutral-500 text-sm truncate">{{ property.distance }}</span>
                <span class="text-neutral-500 text-sm truncate">{{ property.date }}</span>
                <span class="mt-1"><span class="font-bold">${{ property.price }}</span> <span class="text-neutral-900">night</span></span>
              </div>
              <div class="flex items-center gap-1 text-sm font-medium">
                <Star class="w-3.5 h-3.5 fill-current" /> {{ property.rating }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map View (Right) -->
      <div class="hidden lg:block flex-1 bg-neutral-100 relative">
        <!-- Mock Map Background -->
        <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
        
        <!-- Mock Pins -->
        <div class="absolute top-[30%] left-[40%] bg-white px-3 py-1.5 rounded-full font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer border border-neutral-200 z-10">$180</div>
        <div class="absolute top-[50%] left-[60%] bg-black text-white px-3 py-1.5 rounded-full font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer z-10">$450</div>
        <div class="absolute top-[20%] left-[70%] bg-white px-3 py-1.5 rounded-full font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer border border-neutral-200 z-10">$320</div>
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
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #D1D5DB;
}
</style>
