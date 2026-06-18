import { ref, watch, computed } from 'vue'

export interface Note {
  id: string
  title: string
  content: string
  parentId: string | null
  isFolder: boolean
  createdAt: string
  updatedAt: string
  isOpen?: boolean // UI state for folders
}

const STORAGE_KEY = 'notes_app_data'

export function useNotesStore() {
  const notes = ref<Note[]>([])
  const activeNoteId = ref<string | null>(null)
  const isLoaded = ref(false)

  const loadData = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      notes.value = JSON.parse(saved)
    } else {
      // Generate default welcome note
      const welcomeId = crypto.randomUUID()
      notes.value = [
        {
          id: welcomeId,
          title: 'Welcome to your Notes',
          content: '# Welcome to Markdown Notes\n\nThis is a **Notion-style** note-taking app.\n\n## Features:\n- 🗂 **Nested Folders**: Create folders inside folders.\n- ✍️ **Markdown Parsing**: Real-time markdown rendering.\n- 💾 **Local Storage**: Everything is saved automatically.\n\nTry editing this text or creating a new note from the sidebar!',
          parentId: null,
          isFolder: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      activeNoteId.value = welcomeId
      saveData()
    }
    isLoaded.value = true
  }

  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value))
  }

  watch(notes, saveData, { deep: true })

  const createNote = (parentId: string | null = null, isFolder: boolean = false) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: isFolder ? 'New Folder' : 'Untitled Note',
      content: isFolder ? '' : '# Untitled Note\n\n',
      parentId,
      isFolder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isOpen: true
    }
    notes.value.push(newNote)
    if (!isFolder) {
      activeNoteId.value = newNote.id
    }
    return newNote
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      Object.assign(note, updates)
      note.updatedAt = new Date().toISOString()
    }
  }

  const deleteNote = (id: string) => {
    // Delete all children recursively
    const getChildrenIds = (parentId: string): string[] => {
      const children = notes.value.filter(n => n.parentId === parentId)
      let ids = children.map(c => c.id)
      children.forEach(c => {
        if (c.isFolder) {
          ids = [...ids, ...getChildrenIds(c.id)]
        }
      })
      return ids
    }

    const idsToDelete = [id, ...getChildrenIds(id)]
    notes.value = notes.value.filter(n => !idsToDelete.includes(n.id))
    
    if (activeNoteId.value && idsToDelete.includes(activeNoteId.value)) {
      activeNoteId.value = null
    }
  }

  const toggleFolder = (id: string) => {
    const note = notes.value.find(n => n.id === id)
    if (note && note.isFolder) {
      note.isOpen = !note.isOpen
    }
  }

  const getChildren = (parentId: string | null) => {
    return notes.value.filter(n => n.parentId === parentId)
  }

  const activeNote = computed(() => {
    return notes.value.find(n => n.id === activeNoteId.value)
  })

  if (!isLoaded.value) loadData()

  return {
    notes,
    activeNoteId,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    toggleFolder,
    getChildren
  }
}
