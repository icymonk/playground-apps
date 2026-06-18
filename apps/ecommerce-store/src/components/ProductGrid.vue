<script setup lang="ts">
import { MOCK_PRODUCTS, useCartStore } from '../lib/store'
import { ShoppingCart, Star } from 'lucide-vue-next'

const store = useCartStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero Banner -->
    <div class="rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-neutral-800 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="max-w-xl">
        <span class="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">New Arrivals</span>
        <h1 class="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Elevate Your Workspace.</h1>
        <p class="text-neutral-400 text-lg">Discover our curated collection of premium tools and accessories designed for modern professionals.</p>
      </div>
    </div>

    <div class="flex justify-between items-end mb-8">
      <h2 class="text-2xl font-bold text-white">Trending Now</h2>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="product in MOCK_PRODUCTS" 
        :key="product.id"
        class="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors flex flex-col"
      >
        <!-- Image Container -->
        <div class="aspect-square bg-neutral-800 relative overflow-hidden">
          <img :src="product.image" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Product Info -->
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold text-white leading-tight flex-1 pr-4">{{ product.title }}</h3>
            <span class="text-lg font-black text-indigo-400">${{ product.price.toFixed(2) }}</span>
          </div>
          
          <div class="flex items-center gap-1.5 mb-4 text-sm">
            <Star class="w-4 h-4 fill-amber-400 text-amber-400" />
            <span class="font-medium text-neutral-200">{{ product.rating.rate }}</span>
            <span class="text-neutral-500">({{ product.rating.count }})</span>
          </div>

          <p class="text-sm text-neutral-400 line-clamp-2 mb-6 flex-1">{{ product.description }}</p>

          <!-- Add to Cart Button -->
          <button 
            @click="store.addToCart(product)"
            class="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold hover:bg-neutral-200 transition-colors focus:ring-4 focus:ring-white/20"
          >
            <ShoppingCart class="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
