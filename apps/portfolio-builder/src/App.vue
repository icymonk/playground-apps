<script setup lang="ts">
import { ref } from 'vue'
import { LayoutDashboard, Type, Image as ImageIcon, Link, Palette, ExternalLink, Save } from 'lucide-vue-next'

const config = ref({
  name: 'Alex Developer',
  role: 'Frontend Engineer & UI Designer',
  bio: 'Building beautiful, performant web applications using Vue 3 and Tailwind CSS. Obsessed with micro-interactions and clean architecture.',
  theme: 'dark',
  primaryColor: '#6366f1',
  social: {
    github: 'https://github.com',
    twitter: 'https://twitter.com'
  }
})
</script>

<template>
  <div class="h-screen flex bg-neutral-100 font-sans text-neutral-900 overflow-hidden">
    
    <!-- Builder Controls (Left Sidebar) -->
    <aside class="w-[400px] bg-white border-r border-neutral-200 flex flex-col shrink-0 shadow-2xl z-20">
      <div class="h-16 flex items-center justify-between px-6 border-b border-neutral-200 shrink-0">
        <h1 class="font-black text-xl flex items-center gap-2"><LayoutDashboard class="w-6 h-6 text-indigo-600" /> Portfolio<span class="text-indigo-600">Builder</span></h1>
        <button class="flex items-center gap-2 text-sm font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
          <Save class="w-4 h-4" /> Save
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <!-- Section: Content -->
        <div>
          <h2 class="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2"><Type class="w-4 h-4" /> Content</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold mb-1.5">Full Name</label>
              <input v-model="config.name" type="text" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium" />
            </div>
            <div>
              <label class="block text-sm font-bold mb-1.5">Role / Headline</label>
              <input v-model="config.role" type="text" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium" />
            </div>
            <div>
              <label class="block text-sm font-bold mb-1.5">Bio</label>
              <textarea v-model="config.bio" rows="4" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- Section: Social -->
        <div class="pt-6 border-t border-neutral-100">
          <h2 class="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2"><Link class="w-4 h-4" /> Social Links</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold mb-1.5">GitHub URL</label>
              <input v-model="config.social.github" type="text" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 transition-all font-medium" />
            </div>
            <div>
              <label class="block text-sm font-bold mb-1.5">Twitter URL</label>
              <input v-model="config.social.twitter" type="text" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 transition-all font-medium" />
            </div>
          </div>
        </div>

        <!-- Section: Theme -->
        <div class="pt-6 border-t border-neutral-100">
          <h2 class="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2"><Palette class="w-4 h-4" /> Theme</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold mb-2">Color Mode</label>
              <div class="flex gap-2">
                <button @click="config.theme = 'light'" class="flex-1 py-2 rounded-xl border-2 font-bold transition-all" :class="config.theme === 'light' ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'">Light</button>
                <button @click="config.theme = 'dark'" class="flex-1 py-2 rounded-xl border-2 font-bold transition-all" :class="config.theme === 'dark' ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'">Dark</button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">Accent Color</label>
              <div class="flex gap-3">
                <button @click="config.primaryColor = '#6366f1'" class="w-8 h-8 rounded-full bg-[#6366f1] ring-offset-2 transition-all" :class="{ 'ring-2 ring-[#6366f1]': config.primaryColor === '#6366f1' }"></button>
                <button @click="config.primaryColor = '#f43f5e'" class="w-8 h-8 rounded-full bg-[#f43f5e] ring-offset-2 transition-all" :class="{ 'ring-2 ring-[#f43f5e]': config.primaryColor === '#f43f5e' }"></button>
                <button @click="config.primaryColor = '#10b981'" class="w-8 h-8 rounded-full bg-[#10b981] ring-offset-2 transition-all" :class="{ 'ring-2 ring-[#10b981]': config.primaryColor === '#10b981' }"></button>
                <button @click="config.primaryColor = '#f59e0b'" class="w-8 h-8 rounded-full bg-[#f59e0b] ring-offset-2 transition-all" :class="{ 'ring-2 ring-[#f59e0b]': config.primaryColor === '#f59e0b' }"></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>

    <!-- Live Preview (Right Area) -->
    <main class="flex-1 flex flex-col min-w-0 bg-neutral-100 relative">
      <!-- Toolbar -->
      <div class="absolute top-4 right-4 flex gap-2 z-10">
        <div class="bg-white px-4 py-2 rounded-full shadow-lg border border-neutral-200 text-sm font-bold flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Preview
        </div>
        <button class="bg-white p-2 rounded-full shadow-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
          <ExternalLink class="w-5 h-5" />
        </button>
      </div>

      <!-- Scaled Device Frame container -->
      <div class="flex-1 p-8 flex items-center justify-center overflow-auto custom-scrollbar">
        <!-- Rendered Website -->
        <div 
          class="w-full max-w-4xl aspect-[16/10] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-500 relative flex flex-col"
          :class="config.theme === 'dark' ? 'bg-[#0F172A] text-white' : 'bg-white text-slate-900'"
        >
          <!-- Mock Browser Header -->
          <div class="h-10 bg-black/10 backdrop-blur shrink-0 flex items-center px-4 gap-2">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-rose-500"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div class="mx-auto text-xs font-bold opacity-50 px-8 py-1 rounded-full bg-black/5">alex.dev</div>
          </div>

          <!-- Generated Portfolio Content -->
          <div class="flex-1 p-12 overflow-y-auto">
            <header class="mb-16">
              <div class="w-20 h-20 rounded-full bg-neutral-200 mb-6 flex items-center justify-center overflow-hidden border-2" :style="{ borderColor: config.primaryColor }">
                <ImageIcon class="w-8 h-8 text-neutral-400" />
              </div>
              <h1 class="text-5xl font-black mb-4 tracking-tight">{{ config.name || 'Your Name' }}</h1>
              <h2 class="text-2xl font-bold mb-6 opacity-80" :style="{ color: config.primaryColor }">{{ config.role || 'Your Role' }}</h2>
              <p class="text-lg leading-relaxed max-w-2xl opacity-70">{{ config.bio || 'Write a short bio about yourself.' }}</p>
              
              <div class="flex gap-4 mt-8">
                <a :href="config.social.github" class="px-6 py-3 rounded-full font-bold flex items-center gap-2 text-white transition-transform hover:-translate-y-1" :style="{ backgroundColor: config.primaryColor }">
                  GitHub
                </a>
                <a :href="config.social.twitter" class="px-6 py-3 rounded-full font-bold flex items-center gap-2 border-2 transition-transform hover:-translate-y-1" :class="config.theme === 'dark' ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'">
                  Twitter
                </a>
              </div>
            </header>

            <div>
              <h3 class="text-xl font-bold mb-6">Featured Projects</h3>
              <div class="grid grid-cols-2 gap-6">
                <!-- Mock Project Cards -->
                <div class="p-6 rounded-2xl transition-colors" :class="config.theme === 'dark' ? 'bg-white/5' : 'bg-black/5'">
                  <div class="w-full h-32 rounded-xl mb-4 opacity-50" :style="{ backgroundColor: config.primaryColor }"></div>
                  <h4 class="font-bold text-lg mb-2">E-commerce Platform</h4>
                  <p class="text-sm opacity-70">A full-stack application built with Vue 3 and Firebase.</p>
                </div>
                <div class="p-6 rounded-2xl transition-colors" :class="config.theme === 'dark' ? 'bg-white/5' : 'bg-black/5'">
                  <div class="w-full h-32 rounded-xl mb-4 bg-emerald-500 opacity-50"></div>
                  <h4 class="font-bold text-lg mb-2">Task Management</h4>
                  <p class="text-sm opacity-70">Drag and drop kanban board with real-time updates.</p>
                </div>
              </div>
            </div>
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
  width: 6px;
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
