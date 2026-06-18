<script setup lang="ts">
import { Search, Heart, Clock, ChefHat, Filter } from 'lucide-vue-next'

const recipes = [
  { id: 1, title: 'Creamy Mushroom Pasta', time: '25m', likes: '1.2k', height: 'h-64', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Avocado Toast with Egg', time: '10m', likes: '3.4k', height: 'h-80', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Grilled Salmon Bowl', time: '40m', likes: '890', height: 'h-72', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Berry Smoothie Bowl', time: '15m', likes: '2.1k', height: 'h-64', image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Homemade Pizza', time: '1h', likes: '5k', height: 'h-96', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600' },
]

const categories = ['All', 'Breakfast', 'Pasta', 'Healthy', 'Dessert', 'Vegan']
</script>

<template>
  <div class="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] font-sans selection:bg-orange-500/30">
    
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-orange-900/10 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 transform rotate-3">
          <ChefHat class="w-6 h-6 -rotate-3" />
        </div>
        <h1 class="font-black text-2xl tracking-tight text-[#1A1A1A]">RecipeBook</h1>
      </div>
      <div class="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-sm">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" class="w-full h-full object-cover" />
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <!-- Search & Title -->
      <div class="max-w-2xl mx-auto text-center mb-12">
        <h2 class="text-4xl sm:text-5xl font-black mb-6 leading-tight text-[#1A1A1A]">What would you like to <span class="text-orange-500">cook</span> today?</h2>
        
        <div class="relative flex items-center max-w-xl mx-auto">
          <Search class="absolute left-4 w-5 h-5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search recipes, ingredients..." 
            class="w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-sm border border-neutral-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium placeholder:font-normal"
          />
          <button class="absolute right-3 p-2 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors text-neutral-600">
            <Filter class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Categories -->
      <div class="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-8 snap-x">
        <button 
          v-for="(cat, i) in categories" :key="cat"
          class="snap-center px-6 py-2.5 rounded-full font-bold text-sm shrink-0 transition-all"
          :class="i === 0 ? 'bg-[#1A1A1A] text-white shadow-md' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Masonry Grid Approximation (CSS Columns) -->
      <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        
        <div 
          v-for="recipe in recipes" :key="recipe.id"
          class="break-inside-avoid relative group rounded-[2rem] overflow-hidden cursor-pointer bg-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Image -->
          <div :class="[recipe.height, 'w-full relative']">
            <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover" />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          </div>
          
          <!-- Content Overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
            <h3 class="font-black text-xl mb-3 leading-tight">{{ recipe.title }}</h3>
            
            <div class="flex items-center justify-between text-sm font-bold opacity-90">
              <div class="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Clock class="w-4 h-4" />
                <span>{{ recipe.time }}</span>
              </div>
              <div class="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Heart class="w-4 h-4" />
                <span>{{ recipe.likes }}</span>
              </div>
            </div>
          </div>

          <!-- Like Button (Floating) -->
          <button class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
            <Heart class="w-5 h-5" />
          </button>
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
  background: #E5E7EB;
  border-radius: 4px;
}
</style>
