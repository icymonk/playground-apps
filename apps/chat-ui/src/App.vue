<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from './lib/store'
import { Send, Bot, User, Trash2 } from 'lucide-vue-next'

const store = useChatStore()
const input = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Watch messages and auto-scroll
watch(() => store.messages.value.length, scrollToBottom)
watch(() => store.isTyping.value, scrollToBottom)

const onSubmit = () => {
  if (input.value.trim() && !store.isTyping.value) {
    store.sendMessage(input.value)
    input.value = ''
  }
}

// Initial scroll
setTimeout(scrollToBottom, 100)
</script>

<template>
  <div class="flex flex-col h-screen bg-neutral-900 text-neutral-100 font-sans">
    
    <!-- Header -->
    <header class="h-16 flex items-center justify-between px-6 border-b border-neutral-800 bg-neutral-950/50 backdrop-blur shrink-0 z-10">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
          <Bot class="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h1 class="font-bold text-sm tracking-wide">AI Assistant</h1>
          <p class="text-xs text-neutral-500 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </p>
        </div>
      </div>
      <button @click="store.clearChat" class="text-neutral-500 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-neutral-800" title="Clear Chat">
        <Trash2 class="w-5 h-5" />
      </button>
    </header>

    <!-- Chat History -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
      <div 
        v-for="msg in store.messages.value" 
        :key="msg.id"
        class="flex gap-4 max-w-3xl mx-auto"
        :class="msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
      >
        <!-- Avatar -->
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
          :class="msg.role === 'user' ? 'bg-neutral-800 border-neutral-700' : 'bg-indigo-500/20 border-indigo-500/50'"
        >
          <User v-if="msg.role === 'user'" class="w-5 h-5 text-neutral-400" />
          <Bot v-else class="w-5 h-5 text-indigo-400" />
        </div>

        <!-- Message Bubble -->
        <div 
          class="px-5 py-3.5 rounded-2xl max-w-[80%]"
          :class="msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-neutral-800 text-neutral-200 rounded-tl-none border border-neutral-700'"
        >
          <p class="whitespace-pre-wrap leading-relaxed text-[15px]">{{ msg.content }}</p>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="store.isTyping.value" class="flex gap-4 max-w-3xl mx-auto">
        <div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/50">
          <Bot class="w-5 h-5 text-indigo-400" />
        </div>
        <div class="px-5 py-4 rounded-2xl rounded-tl-none bg-neutral-800 border border-neutral-700 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-neutral-500 animate-bounce" style="animation-delay: 0ms"></span>
          <span class="w-2 h-2 rounded-full bg-neutral-500 animate-bounce" style="animation-delay: 150ms"></span>
          <span class="w-2 h-2 rounded-full bg-neutral-500 animate-bounce" style="animation-delay: 300ms"></span>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 sm:p-6 bg-gradient-to-t from-neutral-900 to-transparent shrink-0">
      <form @submit.prevent="onSubmit" class="max-w-3xl mx-auto relative flex items-end gap-2 bg-neutral-800 border border-neutral-700 rounded-2xl p-2 shadow-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
        <textarea 
          v-model="input"
          @keydown.enter.exact.prevent="onSubmit"
          placeholder="Message AI Assistant..."
          class="flex-1 bg-transparent resize-none max-h-32 min-h-[44px] py-3 px-4 outline-none text-neutral-100 placeholder:text-neutral-500"
          rows="1"
        ></textarea>
        <button 
          type="submit" 
          :disabled="!input.trim() || store.isTyping.value"
          class="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 mb-0.5"
        >
          <Send class="w-5 h-5" />
        </button>
      </form>
      <p class="text-center text-xs text-neutral-500 mt-3">AI can make mistakes. Consider verifying important information.</p>
    </div>

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
  background: #262626;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #404040;
}
</style>
