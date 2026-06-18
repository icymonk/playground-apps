<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import ProductGrid from './components/ProductGrid.vue'
import CartDrawer from './components/CartDrawer.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-neutral-100 font-sans selection:bg-indigo-500/30">
    <Navbar />
    
    <main>
      <ProductGrid />
    </main>

    <CartDrawer />
  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar globally for the app */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #404040;
}
</style>
