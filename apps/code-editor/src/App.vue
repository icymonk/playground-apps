<script setup lang="ts">
import { Files, Search, GitBranch, Play, Settings, ChevronRight, ChevronDown, X, Terminal as TerminalIcon, User } from 'lucide-vue-next'
</script>

<template>
  <div class="h-screen flex flex-col bg-[#1E1E1E] text-[#CCCCCC] font-mono text-sm selection:bg-[#264F78] overflow-hidden">
    
    <!-- Title Bar -->
    <header class="h-8 bg-[#323233] flex items-center px-3 border-b border-[#1E1E1E] shrink-0 text-xs">
      <div class="flex items-center gap-4">
        <svg viewBox="0 0 1024 1024" class="w-4 h-4 fill-[#0066B8]"><path d="M736.5 125l249 249v276l-249 249-343-162-171 162-222-106v-562l222-106 171 162z"/></svg>
        <div class="hidden sm:flex gap-4 text-[#CCCCCC]">
          <span class="hover:bg-white/10 px-2 rounded cursor-pointer">File</span>
          <span class="hover:bg-white/10 px-2 rounded cursor-pointer">Edit</span>
          <span class="hover:bg-white/10 px-2 rounded cursor-pointer">Selection</span>
          <span class="hover:bg-white/10 px-2 rounded cursor-pointer">View</span>
          <span class="hover:bg-white/10 px-2 rounded cursor-pointer">Go</span>
          <span class="hover:bg-white/10 px-2 rounded cursor-pointer">Terminal</span>
        </div>
      </div>
      <div class="absolute left-1/2 -translate-x-1/2 text-[#858585] hidden sm:block">App.vue - my-project - VS Code</div>
    </header>

    <!-- Main Workspace -->
    <div class="flex-1 flex min-h-0">
      
      <!-- Activity Bar (Icons) -->
      <div class="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 shrink-0 border-r border-[#252526]">
        <Files class="w-6 h-6 text-white cursor-pointer" />
        <Search class="w-6 h-6 text-[#858585] hover:text-white cursor-pointer transition-colors" />
        <GitBranch class="w-6 h-6 text-[#858585] hover:text-white cursor-pointer transition-colors" />
        <Play class="w-6 h-6 text-[#858585] hover:text-white cursor-pointer transition-colors" />
        <div class="mt-auto flex flex-col gap-4">
          <User class="w-6 h-6 text-[#858585] hover:text-white cursor-pointer transition-colors" />
          <Settings class="w-6 h-6 text-[#858585] hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <!-- Side Bar (Explorer) -->
      <div class="w-64 bg-[#252526] shrink-0 border-r border-[#1E1E1E] flex flex-col hidden md:flex">
        <div class="px-5 py-3 text-xs uppercase text-[#CCCCCC] tracking-wide">Explorer</div>
        <div class="flex items-center px-1 py-1 cursor-pointer bg-[#37373D] text-white">
          <ChevronDown class="w-4 h-4 mr-1" />
          <span class="font-bold">MY-PROJECT</span>
        </div>
        
        <!-- File Tree Mock -->
        <div class="py-2">
          <!-- Folder -->
          <div class="flex items-center px-4 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#CCCCCC]">
            <ChevronDown class="w-4 h-4 mr-1" />
            <span class="text-[#DCB67A]">src</span>
          </div>
          <!-- Files -->
          <div class="flex items-center pl-9 pr-4 py-1 bg-[#37373D] cursor-pointer text-white">
            <span class="text-[#41B883] mr-2">V</span>
            App.vue
          </div>
          <div class="flex items-center pl-9 pr-4 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#CCCCCC]">
            <span class="text-[#3178C6] mr-2">TS</span>
            main.ts
          </div>
          <div class="flex items-center pl-9 pr-4 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#CCCCCC]">
            <span class="text-[#519ABA] mr-2">#</span>
            style.css
          </div>
          <div class="flex items-center px-6 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#CCCCCC]">
            <span class="text-[#CBCB41] mr-2">{}</span>
            package.json
          </div>
          <div class="flex items-center px-6 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#CCCCCC]">
            <span class="text-[#000000] mr-2 bg-white px-0.5 rounded text-[10px]">M</span>
            README.md
          </div>
        </div>
      </div>

      <!-- Editor Area -->
      <div class="flex-1 flex flex-col min-w-0 bg-[#1E1E1E]">
        <!-- Tabs -->
        <div class="h-9 flex bg-[#2D2D2D] shrink-0 overflow-x-auto custom-scrollbar">
          <div class="flex items-center gap-2 px-3 min-w-max bg-[#1E1E1E] text-white border-t-2 border-t-[#007ACC] cursor-pointer">
            <span class="text-[#41B883]">V</span>
            App.vue
            <X class="w-4 h-4 text-[#858585] hover:text-white rounded hover:bg-[#333333] ml-2" />
          </div>
          <div class="flex items-center gap-2 px-3 min-w-max text-[#858585] border-r border-[#2D2D2D] cursor-pointer hover:bg-[#2B2D2E]">
            <span class="text-[#3178C6]">TS</span>
            main.ts
          </div>
        </div>

        <!-- Breadcrumbs -->
        <div class="h-6 flex items-center px-4 text-[#858585] shrink-0 border-b border-[#2D2D2D]/50 text-xs shadow-md">
          my-project <ChevronRight class="w-3 h-3 mx-1" /> src <ChevronRight class="w-3 h-3 mx-1" /> App.vue
        </div>

        <!-- Code Area -->
        <div class="flex-1 overflow-auto custom-scrollbar flex">
          <div class="w-12 text-[#858585] text-right pr-4 py-2 select-none border-r border-[#404040]/30 shrink-0">
            <div v-for="i in 21" :key="i" class="leading-6">{{ i }}</div>
          </div>
          <div class="flex-1 py-2 pl-4 text-[#D4D4D4] whitespace-pre font-mono text-sm leading-6 custom-scrollbar overflow-auto">
            <span class="text-[#808080]">&lt;</span><span class="text-[#569CD6]">template</span><span class="text-[#808080]">&gt;</span>
  <span class="text-[#808080]">&lt;</span><span class="text-[#569CD6]">div</span> <span class="text-[#9CDCFE]">class</span>=<span class="text-[#CE9178]">"editor-container"</span><span class="text-[#808080]">&gt;</span>
    <span class="text-[#808080]">&lt;</span><span class="text-[#569CD6]">h1</span><span class="text-[#808080]">&gt;</span>Hello VS Code Clone<span class="text-[#808080]">&lt;/</span><span class="text-[#569CD6]">h1</span><span class="text-[#808080]">&gt;</span>
    <span class="text-[#808080]">&lt;</span><span class="text-[#569CD6]">p</span><span class="text-[#808080]">&gt;</span>This is a mocked syntax highlighting view.<span class="text-[#808080]">&lt;/</span><span class="text-[#569CD6]">p</span><span class="text-[#808080]">&gt;</span>
  <span class="text-[#808080]">&lt;/</span><span class="text-[#569CD6]">div</span><span class="text-[#808080]">&gt;</span>
<span class="text-[#808080]">&lt;/</span><span class="text-[#569CD6]">template</span><span class="text-[#808080]">&gt;</span>

<span class="text-[#808080]">&lt;</span><span class="text-[#569CD6]">script</span> <span class="text-[#9CDCFE]">setup</span> <span class="text-[#9CDCFE]">lang</span>=<span class="text-[#CE9178]">"ts"</span><span class="text-[#808080]">&gt;</span>
<span class="text-[#C586C0]">import</span> { ref } <span class="text-[#C586C0]">from</span> <span class="text-[#CE9178]">'vue'</span>

<span class="text-[#569CD6]">const</span> <span class="text-[#4FC1FF]">isCool</span> = <span class="text-[#DCDCAA]">ref</span>(<span class="text-[#569CD6]">true</span>)

<span class="text-[#569CD6]">function</span> <span class="text-[#DCDCAA]">toggleCool</span>() {
  isCool.value = !isCool.value
}
<span class="text-[#808080]">&lt;/</span><span class="text-[#569CD6]">script</span><span class="text-[#808080]">&gt;</span>

<span class="text-[#808080]">&lt;</span><span class="text-[#569CD6]">style</span> <span class="text-[#9CDCFE]">scoped</span><span class="text-[#808080]">&gt;</span>
<span class="text-[#D7BA7D]">.editor-container</span> {
  <span class="text-[#9CDCFE]">color</span>: <span class="text-[#CE9178]">#abb2bf</span>;
}
<span class="text-[#808080]">&lt;/</span><span class="text-[#569CD6]">style</span><span class="text-[#808080]">&gt;</span>
          </div>
        </div>

        <!-- Terminal Panel -->
        <div class="h-48 border-t border-[#808080]/30 bg-[#1E1E1E] flex flex-col shrink-0">
          <div class="flex items-center gap-4 px-4 h-9 text-[11px] uppercase tracking-wide text-[#858585] shrink-0">
            <span class="hover:text-[#E7E7E7] cursor-pointer">Problems</span>
            <span class="hover:text-[#E7E7E7] cursor-pointer">Output</span>
            <span class="hover:text-[#E7E7E7] cursor-pointer">Debug Console</span>
            <span class="text-[#E7E7E7] border-b border-[#E7E7E7] h-full flex items-center cursor-pointer">Terminal</span>
          </div>
          <div class="flex-1 p-2 px-4 font-mono text-[13px] text-[#CCCCCC] overflow-y-auto custom-scrollbar">
            <div><span class="text-[#4AF626]">cjmac@macbook</span> <span class="text-[#E5E510]">~/project/my-project</span></div>
            <div>$ bun run dev</div>
            <div class="text-[#41B883] mt-2">vite v8.0.16 building client environment...</div>
            <div class="text-white mt-1">✓ 1737 modules transformed.</div>
            <div class="text-white">built in 156ms</div>
            <div class="mt-2"><span class="text-[#4AF626]">cjmac@macbook</span> <span class="text-[#E5E510]">~/project/my-project</span></div>
            <div class="flex items-center"><span class="animate-pulse w-2 h-4 bg-white/50 inline-block ml-1"></span></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Status Bar -->
    <footer class="h-6 bg-[#007ACC] flex items-center justify-between px-3 shrink-0 text-white text-xs z-10">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer"><GitBranch class="w-3 h-3" /> main*</span>
        <span class="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer"><svg viewBox="0 0 16 16" class="w-3 h-3 fill-current"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 13V2a6 6 0 110 12z"/></svg> 0 ⚠ 0</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="hover:bg-white/20 px-1 rounded cursor-pointer">Ln 21, Col 9</span>
        <span class="hover:bg-white/20 px-1 rounded cursor-pointer hidden sm:block">Spaces: 2</span>
        <span class="hover:bg-white/20 px-1 rounded cursor-pointer hidden sm:block">UTF-8</span>
        <span class="hover:bg-white/20 px-1 rounded cursor-pointer hidden md:block">Vue</span>
        <span class="hover:bg-white/20 px-1 rounded cursor-pointer"><TerminalIcon class="w-3 h-3" /></span>
      </div>
    </footer>

  </div>
</template>

<style>
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(121, 121, 121, 0.4);
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.7);
}
</style>
