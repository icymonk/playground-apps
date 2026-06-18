<script setup lang="ts">
import { computed, ref } from 'vue'
import { useKanbanStore, type ColumnType } from './lib/store'
import { Plus, Trash2, GripVertical } from 'lucide-vue-next'

const store = useKanbanStore()

const columns: { id: ColumnType, title: string, color: string }[] = [
  { id: 'todo', title: 'To Do', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  { id: 'inprogress', title: 'In Progress', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
]

const getTasksByColumn = (colId: ColumnType) => computed(() => store.tasks.value.filter(t => t.column === colId))

// Drag and Drop Logic
const draggedTaskId = ref<string | null>(null)
const dragOverColumn = ref<ColumnType | null>(null)

const onDragStart = (e: DragEvent, taskId: string) => {
  draggedTaskId.value = taskId
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', taskId)
  }
}

const onDragOver = (e: DragEvent, colId: ColumnType) => {
  e.preventDefault()
  dragOverColumn.value = colId
}

const onDragLeave = () => {
  dragOverColumn.value = null
}

const onDrop = (e: DragEvent, targetColId: ColumnType) => {
  e.preventDefault()
  dragOverColumn.value = null
  const taskId = e.dataTransfer?.getData('text/plain')
  if (taskId && taskId === draggedTaskId.value) {
    store.moveTask(taskId, targetColId)
  }
  draggedTaskId.value = null
}

const onDragEnd = () => {
  draggedTaskId.value = null
  dragOverColumn.value = null
}

const handleAdd = (colId: ColumnType) => {
  const title = prompt('Enter task title:')
  if (title?.trim()) {
    store.addTask(title, colId)
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans">
    <header class="mb-8">
      <h1 class="text-3xl font-black tracking-tight">Trello Clone</h1>
      <p class="text-neutral-500">Drag and drop tasks between columns</p>
    </header>

    <div class="flex gap-6 overflow-x-auto pb-8 custom-scrollbar items-start">
      
      <!-- Columns -->
      <div 
        v-for="col in columns" 
        :key="col.id"
        class="w-80 shrink-0 bg-neutral-900 rounded-2xl border flex flex-col max-h-[80vh] transition-colors duration-200"
        :class="dragOverColumn === col.id ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-neutral-800'"
        @dragover="onDragOver($event, col.id)"
        @dragleave="onDragLeave"
        @drop="onDrop($event, col.id)"
      >
        <!-- Column Header -->
        <div class="p-4 border-b border-neutral-800 flex justify-between items-center">
          <div class="flex items-center gap-2 px-3 py-1 rounded-full border" :class="col.color">
            <span class="text-xs font-bold uppercase tracking-wider">{{ col.title }}</span>
            <span class="text-xs font-black opacity-60">{{ getTasksByColumn(col.id).value.length }}</span>
          </div>
          <button @click="handleAdd(col.id)" class="text-neutral-500 hover:text-white p-1 rounded hover:bg-neutral-800 transition-colors">
            <Plus class="w-5 h-5" />
          </button>
        </div>

        <!-- Task List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar min-h-[150px]">
          <div 
            v-for="task in getTasksByColumn(col.id).value" 
            :key="task.id"
            draggable="true"
            @dragstart="onDragStart($event, task.id)"
            @dragend="onDragEnd"
            class="group bg-neutral-800 border border-neutral-700 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-neutral-500 transition-all shadow-sm"
            :class="{ 'opacity-50': draggedTaskId === task.id }"
          >
            <div class="flex items-start gap-2">
              <GripVertical class="w-4 h-4 text-neutral-600 shrink-0 mt-0.5 cursor-grab hidden group-hover:block" />
              <div class="flex-1">
                <h3 class="font-bold text-sm leading-tight text-white mb-1">{{ task.title }}</h3>
                <p v-if="task.description" class="text-xs text-neutral-400 line-clamp-2">{{ task.description }}</p>
              </div>
              <button @click="store.deleteTask(task.id)" class="text-neutral-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Drop Placeholder -->
          <div v-if="dragOverColumn === col.id" class="h-20 border-2 border-dashed border-indigo-500/50 rounded-xl bg-indigo-500/10 transition-all"></div>
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
  width: 6px;
  height: 6px;
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
