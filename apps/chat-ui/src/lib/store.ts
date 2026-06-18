import { ref, watch } from 'vue'

export type Role = 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: string
}

const STORAGE_KEY = 'chat_ui_history'

export function useChatStore() {
  const messages = ref<Message[]>([])
  const isTyping = ref(false)

  const loadMessages = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      messages.value = JSON.parse(saved)
    } else {
      messages.value = [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Hello! I am an AI assistant. How can I help you today?',
          timestamp: new Date().toISOString()
        }
      ]
    }
  }

  const saveMessages = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
  }

  watch(messages, saveMessages, { deep: true })

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    messages.value.push({
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    })

    isTyping.value = true

    // Simulate AI delay and response
    setTimeout(() => {
      isTyping.value = false
      messages.value.push({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `I received your message: "${content}". This is a simulated response!`,
        timestamp: new Date().toISOString()
      })
    }, 1500 + Math.random() * 1000) // 1.5s to 2.5s delay
  }

  const clearChat = () => {
    messages.value = [
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Conversation cleared. How can I help you?',
        timestamp: new Date().toISOString()
      }
    ]
  }

  loadMessages()

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat
  }
}
