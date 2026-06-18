<script setup lang="ts">
import { computed } from 'vue'
import { Plus, FolderPlus, Book } from 'lucide-vue-next'
import { useNotesStore } from '../lib/store'
import FileTreeNode from './FileTreeNode.vue'

const store = useNotesStore()
const rootNodes = computed(() => store.getChildren(null))

const createRootFolder = () => {
  store.createNote(null, true)
}

const createRootNote = () => {
  store.createNote(null, false)
}
</script>

<template>
  <div class="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col h-screen select-none">
    
    <!-- Workspace Header -->
    <div class="p-4 flex items-center gap-2 border-b border-neutral-800 text-neutral-200">
      <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-500/20">
        <Book class="w-4 h-4 text-white" />
      </div>
      <span class="font-bold text-sm tracking-tight">My Workspace</span>
    </div>

    <!-- Tree Actions -->
    <div class="px-4 py-3 flex items-center justify-between text-xs font-semibold text-neutral-500 uppercase tracking-wider">
      <span>Documents</span>
      <div class="flex gap-2">
        <button @click="createRootNote" class="hover:text-neutral-200" title="New Note">
          <Plus class="w-3.5 h-3.5" />
        </button>
        <button @click="createRootFolder" class="hover:text-neutral-200" title="New Folder">
          <FolderPlus class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Tree View -->
    <div class="flex-1 overflow-y-auto py-2 custom-scrollbar">
      <FileTreeNode 
        v-for="node in rootNodes" 
        :key="node.id" 
        :node="node" 
        :depth="0" 
      />
      
      <div v-if="rootNodes.length === 0" class="px-4 py-8 text-center text-neutral-500 text-sm">
        <p>No documents yet.</p>
        <button @click="createRootNote" class="mt-2 text-blue-400 hover:underline">Create one</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
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
