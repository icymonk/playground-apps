<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle2, Loader2, X } from 'lucide-vue-next'
import { useCartStore } from '../lib/store'

const emit = defineProps<{}>()
const emitClose = defineEmits<{ (e: 'close'): void }>()

const store = useCartStore()
const isProcessing = ref(false)
const isSuccess = ref(false)

const handleCheckout = () => {
  isProcessing.value = true
  // Simulate network request
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    store.clearCart() // Empty cart on success
  }, 2000)
}
</script>

<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
    
    <!-- Success State -->
    <div v-if="isSuccess" class="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md p-8 text-center shadow-2xl transform transition-all">
      <div class="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 class="w-10 h-10 text-emerald-500" />
      </div>
      <h2 class="text-2xl font-bold mb-2">Payment Successful!</h2>
      <p class="text-neutral-400 mb-8">Your order has been processed and is now being prepared for shipping.</p>
      <button @click="emitClose('close')" class="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3.5 rounded-xl transition-colors border border-neutral-700">
        Back to Store
      </button>
    </div>

    <!-- Checkout Form -->
    <div v-else class="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
      
      <div class="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
        <h2 class="text-xl font-bold">Checkout</h2>
        <button @click="emitClose('close')" class="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
        <!-- Order Summary -->
        <div class="bg-neutral-950 rounded-2xl p-5 mb-8 border border-neutral-800">
          <h3 class="font-bold mb-4 text-sm uppercase tracking-wider text-neutral-500">Order Summary</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-neutral-400">Total Items</span>
              <span class="font-medium">{{ store.totalItems.value }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-3 border-t border-neutral-800">
              <span>Amount Due</span>
              <span class="text-indigo-400">${{ store.total.value.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleCheckout" class="space-y-6">
          <div class="space-y-4">
            <h3 class="font-bold text-sm uppercase tracking-wider text-neutral-500">Shipping Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-sm font-medium text-neutral-400 mb-1.5">First Name</label>
                <input required type="text" class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-sm font-medium text-neutral-400 mb-1.5">Last Name</label>
                <input required type="text" class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Doe">
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-neutral-400 mb-1.5">Address</label>
                <input required type="text" class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="123 Main St">
              </div>
            </div>
          </div>

          <div class="space-y-4 pt-4 border-t border-neutral-800">
            <h3 class="font-bold text-sm uppercase tracking-wider text-neutral-500">Payment Details</h3>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-neutral-400 mb-1.5">Card Number</label>
              <div class="relative">
                <input required type="text" class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors tracking-widest" placeholder="0000 0000 0000 0000" maxlength="19">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <label class="block text-sm font-medium text-neutral-400 mb-1.5">Expiry</label>
                <input required type="text" class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="MM/YY" maxlength="5">
              </div>
              <div class="col-span-1">
                <label class="block text-sm font-medium text-neutral-400 mb-1.5">CVC</label>
                <input required type="text" class="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="123" maxlength="3">
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isProcessing"
            class="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-indigo-500/20"
          >
            <Loader2 v-if="isProcessing" class="w-5 h-5 animate-spin" />
            <span v-else>Pay ${{ store.total.value.toFixed(2) }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
