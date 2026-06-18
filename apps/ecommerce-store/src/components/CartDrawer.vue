<script setup lang="ts">
import { useCartStore } from '../lib/store'
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'
import CheckoutModal from './CheckoutModal.vue'

const store = useCartStore()
const isCheckoutOpen = ref(false)

const openCheckout = () => {
  store.isCartOpen.value = false
  isCheckoutOpen.value = true
}
</script>

<template>
  <!-- Backdrop -->
  <div 
    v-if="store.isCartOpen.value" 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
    @click="store.isCartOpen.value = false"
  ></div>

  <!-- Drawer -->
  <div 
    class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col"
    :class="store.isCartOpen.value ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
      <h2 class="text-xl font-bold flex items-center gap-2">
        Your Cart
        <span class="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-0.5 rounded-full">{{ store.totalItems.value }}</span>
      </h2>
      <button @click="store.isCartOpen.value = false" class="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors">
        <X class="w-5 h-5" />
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="store.cart.value.length === 0" class="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div class="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mb-6">
        <ShoppingCart class="w-10 h-10 text-neutral-500" />
      </div>
      <h3 class="text-lg font-bold mb-2">Your cart is empty</h3>
      <p class="text-neutral-400 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
      <button @click="store.isCartOpen.value = false" class="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-neutral-200 transition-colors">
        Continue Shopping
      </button>
    </div>

    <!-- Cart Items -->
    <div v-else class="flex-1 overflow-y-auto p-6 space-y-6">
      <div v-for="item in store.cart.value" :key="item.id" class="flex gap-4">
        <!-- Thumbnail -->
        <div class="w-20 h-20 rounded-xl bg-neutral-800 overflow-hidden shrink-0 border border-neutral-700">
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
        </div>
        
        <!-- Info -->
        <div class="flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-1">
            <h4 class="font-medium text-sm line-clamp-2 pr-4 leading-tight">{{ item.title }}</h4>
            <button @click="store.removeFromCart(item.id)" class="text-neutral-500 hover:text-rose-400 transition-colors mt-0.5">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <p class="text-neutral-400 text-xs mb-auto">{{ item.category }}</p>
          
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-950">
              <button @click="store.updateQuantity(item.id, item.quantity - 1)" class="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                <Minus class="w-3 h-3" />
              </button>
              <span class="w-8 text-center text-sm font-medium">{{ item.quantity }}</span>
              <button @click="store.updateQuantity(item.id, item.quantity + 1)" class="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                <Plus class="w-3 h-3" />
              </button>
            </div>
            <span class="font-bold text-sm">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Summary -->
    <div v-if="store.cart.value.length > 0" class="border-t border-neutral-800 p-6 bg-neutral-950/50 shrink-0">
      <div class="space-y-3 text-sm mb-6">
        <div class="flex justify-between text-neutral-400">
          <span>Subtotal</span>
          <span>${{ store.subtotal.value.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-neutral-400">
          <span>Taxes (10%)</span>
          <span>${{ store.tax.value.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-neutral-400">
          <span>Shipping</span>
          <span :class="store.shipping.value === 0 ? 'text-emerald-400' : ''">
            {{ store.shipping.value === 0 ? 'Free' : '$' + store.shipping.value.toFixed(2) }}
          </span>
        </div>
        <div class="pt-3 border-t border-neutral-800 flex justify-between text-lg font-bold text-white">
          <span>Total</span>
          <span>${{ store.total.value.toFixed(2) }}</span>
        </div>
      </div>
      
      <button @click="openCheckout" class="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
        Proceed to Checkout
        <ArrowRight class="w-5 h-5" />
      </button>
    </div>
  </div>

  <!-- Checkout Modal -->
  <CheckoutModal v-if="isCheckoutOpen" @close="isCheckoutOpen = false" />
</template>

<script lang="ts">
// Needs an extra import since we use ShoppingCart in empty state
import { ShoppingCart } from 'lucide-vue-next'
</script>
