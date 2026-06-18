<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { ChevronRight, ChevronDown, Folder, FileText, Trash2, Edit2 } from 'lucide-vue-next'
import { useNotesStore } from '../lib/store'
import type { Note } from '../lib/store'

const props = defineProps<{
  node: Note
  depth: number
}>()

const store = useNotesStore()
const isEditing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const children = computed(() => store.getChildren(props.node.id))
const isActive = computed(() => store.activeNoteId.value === props.node.id)

const handleToggle = () => {
  if (props.node.isFolder) {
    store.toggleFolder(props.node.id)
  } else {
    store.activeNoteId.value = props.node.id
  }
}

const startRename = (e: Event) => {
  e.stopPropagation()
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const finishRename = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.value.trim()) {
    store.updateNote(props.node.id, { title: target.value })
  }
  isEditing.value = false
}

const addFolder = (e: Event) => {
  e.stopPropagation()
  if (!props.node.isOpen) store.toggleFolder(props.node.id)
  store.createNote(props.node.id, true)
  // small hack to focus rename on the new node would go here if we had global bus, 
  // but for simplicity it just creates 'New Folder'
}

const addNote = (e: Event) => {
  e.stopPropagation()
  if (!props.node.isOpen) store.toggleFolder(props.node.id)
  store.createNote(props.node.id, false)
}

const deleteNode = (e: Event) => {
  e.stopPropagation()
  if (confirm(`Are you sure you want to delete "${props.node.title}"?`)) {
    store.deleteNote(props.node.id)
  }
}
</script>

<template>
  <div>
    <!-- Node Item -->
    <div 
      class="group flex items-center py-1 px-2 mx-2 rounded-md cursor-pointer transition-colors text-sm"
      :class="isActive ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200'"
      :style="{ paddingLeft: `${depth * 12 + 8}px` }"
      @click="handleToggle"
    >
      <!-- Expand Icon -->
      <div class="w-4 h-4 flex items-center justify-center mr-1 text-neutral-500">
        <template v-if="node.isFolder">
          <ChevronDown v-if="node.isOpen" class="w-3 h-3" />
          <ChevronRight v-else class="w-3 h-3" />
        </template>
      </div>

      <!-- Type Icon -->
      <Folder v-if="node.isFolder" class="w-4 h-4 mr-2" :class="node.isOpen ? 'text-blue-400' : 'text-neutral-500'" />
      <FileText v-else class="w-4 h-4 mr-2" :class="isActive ? 'text-neutral-200' : 'text-neutral-500'" />

      <!-- Title or Input -->
      <input 
        v-if="isEditing"
        ref="inputRef"
        :value="node.title"
        @blur="finishRename"
        @keyup.enter="finishRename"
        class="flex-1 bg-neutral-900 border border-blue-500/50 rounded px-1 outline-none text-neutral-100 min-w-0"
        @click.stop
      />
      <span v-else class="flex-1 truncate select-none">{{ node.title }}</span>

      <!-- Actions (Visible on Hover) -->
      <div class="hidden group-hover:flex items-center gap-1 ml-2">
        <button v-if="node.isFolder" @click="addNote" class="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200" title="Add Note">
          <FileText class="w-3 h-3" />
        </button>
        <button v-if="node.isFolder" @click="addFolder" class="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200" title="Add Folder">
          <Folder class="w-3 h-3" />
        </button>
        <button @click="startRename" class="p-1 hover:bg-neutral-700 rounded text-neutral-400 hover:text-neutral-200" title="Rename">
          <Edit2 class="w-3 h-3" />
        </button>
        <button @click="deleteNode" class="p-1 hover:bg-rose-500/20 rounded text-neutral-400 hover:text-rose-400" title="Delete">
          <Trash2 class="w-3 h-3" />
        </button>
      </div>
    </div>

    <!-- Children (Recursive) -->
    <div v-if="node.isFolder && node.isOpen">
      <FileTreeNode 
        v-for="child in children" 
        :key="child.id" 
        :node="child" 
        :depth="depth + 1" 
      />
      <div v-if="children.length === 0" class="text-xs text-neutral-600 italic py-1" :style="{ paddingLeft: `${(depth + 1) * 12 + 28}px` }">
        Empty folder
      </div>
    </div>
  </div>
</template>
