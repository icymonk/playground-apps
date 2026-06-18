import { ref, watch } from 'vue'

export type ColumnType = 'todo' | 'inprogress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  column: ColumnType
}

const STORAGE_KEY = 'kanban_dnd_v1'

export function useKanbanStore() {
  const tasks = ref<Task[]>([])
  const isLoaded = ref(false)

  const loadTasks = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      tasks.value = JSON.parse(saved)
    } else {
      tasks.value = [
        { id: '1', title: 'Research competitors', description: 'Look at what others are doing', column: 'todo' },
        { id: '2', title: 'Design system', description: 'Create Figma tokens', column: 'inprogress' },
        { id: '3', title: 'Setup CI/CD', description: 'GitHub Actions config', column: 'done' }
      ]
    }
    isLoaded.value = true
  }

  const saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  }

  watch(tasks, saveTasks, { deep: true })

  const addTask = (title: string, column: ColumnType) => {
    tasks.value.push({
      id: crypto.randomUUID(),
      title,
      description: '',
      column
    })
  }

  const moveTask = (taskId: string, targetColumn: ColumnType) => {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.column = targetColumn
    }
  }

  const deleteTask = (taskId: string) => {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }

  if (!isLoaded.value) loadTasks()

  return {
    tasks,
    addTask,
    moveTask,
    deleteTask
  }
}
