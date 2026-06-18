<script setup lang="ts">
import { ShoppingBag, Search, Menu } from 'lucide-vue-next'
import { useCartStore } from '../lib/store'

const store = useCartStore()
</script>

<template>
  <nav class="sticky top-0 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Logo & Mobile Menu -->
      <div class="flex items-center gap-4">
        <button class="md:hidden text-neutral-400 hover:text-white transition-colors">
          <Menu class="w-6 h-6" />
        </button>
        <div class="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span class="text-sm">E</span>
          </div>
          Storefront
        </div>
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <a href="#" class="text-white">All Products</a>
        <a href="#" class="hover:text-white transition-colors">Electronics</a>
        <a href="#" class="hover:text-white transition-colors">Furniture</a>
        <a href="#" class="hover:text-white transition-colors">Apparel</a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="text-neutral-400 hover:text-white transition-colors hidden sm:block">
          <Search class="w-5 h-5" />
        </button>
        
        <button @click="store.toggleCart" class="relative p-2 text-neutral-400 hover:text-white transition-colors">
          <ShoppingBag class="w-6 h-6" />
          <span 
            v-if="store.totalItems.value > 0"
            class="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-neutral-900"
          >
            {{ store.totalItems.value }}
          </span>
        </button>
      </div>

    </div>
  </nav>
</template>
