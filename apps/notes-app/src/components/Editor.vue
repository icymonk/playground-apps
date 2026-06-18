<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useNotesStore } from '../lib/store'
import { AlignLeft, Eye, Clock } from 'lucide-vue-next'

const store = useNotesStore()
const isPreviewMode = ref(false)

const note = computed(() => store.activeNote.value)

const parsedContent = computed(() => {
  if (!note.value) return ''
  const rawHtml = marked(note.value.content)
  return DOMPurify.sanitize(rawHtml as string)
})

const updateTitle = (e: Event) => {
  if (!note.value) return
  const target = e.target as HTMLInputElement
  store.updateNote(note.value.id, { title: target.value })
}

const updateContent = (e: Event) => {
  if (!note.value) return
  const target = e.target as HTMLTextAreaElement
  store.updateNote(note.value.id, { content: target.value })
}

const formatDate = (isoStr: string) => {
  const d = new Date(isoStr)
  return d.toLocaleString(undefined, { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  })
}
</script>

<template>
  <div class="flex-1 flex flex-col h-screen bg-neutral-900 text-neutral-100 min-w-0">
    <template v-if="note">
      <!-- Editor Header -->
      <header class="h-14 border-b border-neutral-800 flex items-center justify-between px-6 bg-neutral-900/50 backdrop-blur shrink-0">
        <div class="flex items-center gap-4 text-sm text-neutral-500">
          <span class="flex items-center gap-1.5" title="Last updated">
            <Clock class="w-4 h-4" />
            {{ formatDate(note.updatedAt) }}
          </span>
        </div>
        
        <div class="flex bg-neutral-950 rounded-lg p-0.5 border border-neutral-800">
          <button 
            @click="isPreviewMode = false" 
            class="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            :class="!isPreviewMode ? 'bg-neutral-800 text-neutral-100 shadow' : 'text-neutral-500 hover:text-neutral-300'"
          >
            <AlignLeft class="w-4 h-4" /> Edit
          </button>
          <button 
            @click="isPreviewMode = true" 
            class="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            :class="isPreviewMode ? 'bg-neutral-800 text-neutral-100 shadow' : 'text-neutral-500 hover:text-neutral-300'"
          >
            <Eye class="w-4 h-4" /> Preview
          </button>
        </div>
      </header>

      <!-- Editor Content -->
      <div class="flex-1 overflow-y-auto px-8 md:px-24 py-12 custom-scrollbar">
        <!-- Title Input -->
        <input 
          :value="note.title"
          @input="updateTitle"
          class="w-full bg-transparent text-4xl md:text-5xl font-black text-neutral-100 mb-8 outline-none placeholder:text-neutral-700"
          placeholder="Untitled Note"
        />
        
        <!-- Markdown Editor -->
        <textarea 
          v-if="!isPreviewMode"
          :value="note.content"
          @input="updateContent"
          class="w-full h-[60vh] bg-transparent text-neutral-300 text-lg leading-relaxed outline-none resize-none placeholder:text-neutral-700"
          placeholder="Start writing in markdown..."
        ></textarea>

        <!-- HTML Preview -->
        <div 
          v-else
          class="prose prose-invert prose-blue max-w-none text-lg leading-relaxed pb-32"
          v-html="parsedContent"
        ></div>
      </div>
    </template>

    <template v-else>
      <div class="flex-1 flex flex-col items-center justify-center text-neutral-500">
        <AlignLeft class="w-16 h-16 text-neutral-800 mb-4" />
        <p class="text-lg">Select a note from the sidebar or create a new one.</p>
      </div>
    </template>
  </div>
</template>

<style>
/* Prose overrides for better markdown styling */
.prose pre {
  background-color: #171717 !important;
  border: 1px solid #262626;
}
.prose blockquote {
  border-left-color: #3b82f6 !important;
  color: #a3a3a3 !important;
}
.prose a {
  color: #60a5fa !important;
  text-decoration: none;
}
.prose a:hover {
  text-decoration: underline;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #404040;
}
</style>
