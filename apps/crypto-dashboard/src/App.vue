<script setup lang="ts">
import { TrendingUp, Activity, Maximize2, MoreHorizontal } from 'lucide-vue-next'

const orderBook = {
  asks: [
    { price: '64,231.50', amount: '0.451', total: '28,968.40' },
    { price: '64,230.10', amount: '1.204', total: '77,332.90' },
    { price: '64,228.90', amount: '0.050', total: '3,211.44' },
    { price: '64,225.00', amount: '2.500', total: '160,562.50' },
  ],
  bids: [
    { price: '64,220.00', amount: '0.850', total: '54,587.00' },
    { price: '64,218.40', amount: '3.100', total: '199,077.04' },
    { price: '64,215.10', amount: '0.125', total: '8,026.88' },
    { price: '64,210.00', amount: '5.000', total: '321,050.00' },
  ]
}
</script>

<template>
  <div class="min-h-screen bg-[#0B0E14] text-neutral-300 font-mono text-sm selection:bg-emerald-500/30">
    <!-- Navbar -->
    <header class="h-14 border-b border-[#1E2329] flex items-center justify-between px-4 bg-[#181A20]">
      <div class="flex items-center gap-6">
        <div class="font-black text-xl tracking-tighter text-white">CRYPTO<span class="text-emerald-500">EX</span></div>
        <nav class="hidden md:flex items-center gap-4 text-sm font-medium">
          <a href="#" class="text-white">Trade</a>
          <a href="#" class="hover:text-white transition-colors">Markets</a>
          <a href="#" class="hover:text-white transition-colors">Earn</a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <button class="bg-[#1E2329] hover:bg-[#2B3139] px-4 py-1.5 rounded transition-colors text-white font-medium">Log In</button>
        <button class="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-1.5 rounded font-bold transition-colors">Register</button>
      </div>
    </header>

    <!-- Main Trading Layout -->
    <div class="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      
      <!-- Chart Area (Left) -->
      <div class="flex-1 flex flex-col min-w-0 border-r border-[#1E2329]">
        <!-- Ticker Info -->
        <div class="h-16 border-b border-[#1E2329] flex items-center px-4 gap-6 shrink-0 bg-[#181A20]">
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-white tracking-tight">BTC/USDT</h1>
            <span class="text-emerald-500 underline decoration-dashed underline-offset-4 decoration-emerald-500/50">Bitcoin</span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-neutral-500">24h Change</span>
            <span class="text-emerald-500 font-bold flex items-center gap-1">+2.45% <TrendingUp class="w-3 h-3" /></span>
          </div>
          <div class="flex flex-col hidden sm:flex">
            <span class="text-xs text-neutral-500">24h High</span>
            <span class="text-white font-medium">65,120.00</span>
          </div>
          <div class="flex flex-col hidden sm:flex">
            <span class="text-xs text-neutral-500">24h Low</span>
            <span class="text-white font-medium">62,840.50</span>
          </div>
          <div class="flex flex-col hidden md:flex">
            <span class="text-xs text-neutral-500">24h Vol(BTC)</span>
            <span class="text-white font-medium">45,231.12</span>
          </div>
        </div>

        <!-- Chart Placeholder -->
        <div class="flex-1 relative bg-[#0B0E14] overflow-hidden p-4">
          <!-- Grid Lines -->
          <div class="absolute inset-0" style="background-image: linear-gradient(#1E2329 1px, transparent 1px), linear-gradient(90deg, #1E2329 1px, transparent 1px); background-size: 50px 50px; opacity: 0.2"></div>
          
          <div class="absolute top-4 right-4 flex gap-2">
            <button class="p-1.5 bg-[#1E2329] rounded hover:bg-[#2B3139] text-white"><Maximize2 class="w-4 h-4" /></button>
          </div>

          <!-- Mock Candlesticks -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
            <Activity class="w-64 h-64 text-[#1E2329]" />
          </div>
          <div class="absolute bottom-4 left-4 flex gap-2 text-xs">
            <button class="px-2 py-1 bg-[#1E2329] text-white rounded">15m</button>
            <button class="px-2 py-1 hover:bg-[#1E2329] rounded">1H</button>
            <button class="px-2 py-1 hover:bg-[#1E2329] rounded">4H</button>
            <button class="px-2 py-1 hover:bg-[#1E2329] rounded">1D</button>
          </div>
        </div>
      </div>

      <!-- Order Book & Trading Panel (Right) -->
      <div class="w-full lg:w-80 flex flex-col shrink-0 bg-[#181A20]">
        
        <!-- Order Book -->
        <div class="flex-1 border-b border-[#1E2329] flex flex-col min-h-0">
          <div class="p-3 border-b border-[#1E2329] flex justify-between items-center shrink-0">
            <h3 class="font-bold text-white">Order Book</h3>
            <MoreHorizontal class="w-4 h-4" />
          </div>
          
          <!-- Column Headers -->
          <div class="flex justify-between px-3 py-1.5 text-xs text-neutral-500 shrink-0">
            <span>Price(USDT)</span>
            <span>Amount(BTC)</span>
            <span>Total</span>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            <!-- Asks (Red) -->
            <div class="flex-1 flex flex-col justify-end">
              <div v-for="(ask, i) in orderBook.asks" :key="'ask'+i" class="flex justify-between px-3 py-0.5 text-xs hover:bg-[#1E2329] cursor-pointer relative group">
                <div class="absolute top-0 right-0 h-full bg-rose-500/10 -z-10 transition-all duration-300" :style="{ width: `${20 + i * 15}%` }"></div>
                <span class="text-rose-500 font-medium">{{ ask.price }}</span>
                <span>{{ ask.amount }}</span>
                <span>{{ ask.total }}</span>
              </div>
            </div>

            <!-- Current Price Spread -->
            <div class="py-2 px-3 flex items-center justify-between border-y border-[#1E2329] bg-[#0B0E14] shrink-0">
              <span class="text-lg font-bold text-emerald-500">64,222.50</span>
              <span class="text-xs text-neutral-500 underline decoration-dashed">$64,222.50</span>
            </div>

            <!-- Bids (Green) -->
            <div class="flex-1">
              <div v-for="(bid, i) in orderBook.bids" :key="'bid'+i" class="flex justify-between px-3 py-0.5 text-xs hover:bg-[#1E2329] cursor-pointer relative group">
                <div class="absolute top-0 right-0 h-full bg-emerald-500/10 -z-10 transition-all duration-300" :style="{ width: `${60 - i * 10}%` }"></div>
                <span class="text-emerald-500 font-medium">{{ bid.price }}</span>
                <span>{{ bid.amount }}</span>
                <span>{{ bid.total }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Trade Panel -->
        <div class="p-4 shrink-0">
          <div class="flex gap-1 bg-[#0B0E14] p-1 rounded mb-4">
            <button class="flex-1 py-1.5 bg-[#1E2329] text-white rounded font-bold">Spot</button>
            <button class="flex-1 py-1.5 hover:bg-[#1E2329] rounded font-bold">Margin</button>
          </div>
          
          <div class="space-y-3">
            <div class="relative bg-[#0B0E14] border border-[#1E2329] rounded flex items-center px-3 py-2 focus-within:border-emerald-500 transition-colors">
              <span class="text-xs text-neutral-500 w-12">Price</span>
              <input type="text" class="bg-transparent flex-1 outline-none text-right text-white font-medium pr-2" value="64222.50" />
              <span class="text-xs font-bold text-white">USDT</span>
            </div>
            
            <div class="relative bg-[#0B0E14] border border-[#1E2329] rounded flex items-center px-3 py-2 focus-within:border-emerald-500 transition-colors">
              <span class="text-xs text-neutral-500 w-12">Amount</span>
              <input type="text" class="bg-transparent flex-1 outline-none text-right text-white font-medium pr-2" placeholder="0.00" />
              <span class="text-xs font-bold text-white">BTC</span>
            </div>

            <!-- Slider -->
            <div class="py-2">
              <div class="h-1 bg-[#1E2329] rounded relative">
                <div class="absolute left-[25%] w-3 h-3 bg-white rounded-full -top-1 -translate-x-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>

            <div class="flex justify-between text-xs text-neutral-500 mb-4">
              <span>Total</span>
              <span class="text-white font-bold">0.00 USDT</span>
            </div>

            <div class="flex gap-2">
              <button class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3 rounded font-black tracking-wide transition-colors">BUY BTC</button>
              <button class="flex-1 bg-rose-500 hover:bg-rose-400 text-white py-3 rounded font-black tracking-wide transition-colors">SELL BTC</button>
            </div>
          </div>
        </div>

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
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1E2329;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #2B3139;
}
</style>
