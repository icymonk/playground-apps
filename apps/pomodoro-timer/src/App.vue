<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Play, Pause, RotateCcw, Brain, Coffee, Wind } from 'lucide-vue-next'

type Mode = 'focus' | 'short-break' | 'long-break'

const TIMES: Record<Mode, number> = {
  'focus': 25 * 60,
  'short-break': 5 * 60,
  'long-break': 15 * 60
}

const currentMode = ref<Mode>('focus')
const timeLeft = ref(TIMES['focus'])
const isRunning = ref(false)
const sessionsCompleted = ref(0)
let timerInterval: number | null = null

// Load stats from localStorage
onMounted(() => {
  const savedSessions = localStorage.getItem('pomodoro_sessions')
  if (savedSessions) {
    sessionsCompleted.value = parseInt(savedSessions, 10)
  }
})

// Save stats when updated
watch(sessionsCompleted, (newVal) => {
  localStorage.setItem('pomodoro_sessions', newVal.toString())
})

const totalTime = computed(() => TIMES[currentMode.value])

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

// Update document title for background tracking
watch(formattedTime, (newTime) => {
  const emoji = currentMode.value === 'focus' ? '🧠' : '☕️'
  document.title = `${newTime} ${emoji} - Pomodoro`
})

const playSound = () => {
  try {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
    audio.play()
  } catch (e) {
    // Ignore autoplay errors
  }
}

const toggleTimer = () => {
  if (isRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
}

const startTimer = () => {
  if (timerInterval) return
  isRunning.value = true
  timerInterval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      handleTimerComplete()
    }
  }, 1000)
}

const pauseTimer = () => {
  isRunning.value = false
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const resetTimer = () => {
  pauseTimer()
  timeLeft.value = TIMES[currentMode.value]
}

const setMode = (mode: Mode) => {
  pauseTimer()
  currentMode.value = mode
  timeLeft.value = TIMES[mode]
}

const handleTimerComplete = () => {
  pauseTimer()
  playSound()
  
  if (currentMode.value === 'focus') {
    sessionsCompleted.value++
    // Automatically switch to break
    if (sessionsCompleted.value % 4 === 0) {
      setMode('long-break')
    } else {
      setMode('short-break')
    }
  } else {
    // Break is over, back to focus
    setMode('focus')
  }
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// Theme colors based on mode
const themeClasses = computed(() => {
  switch (currentMode.value) {
    case 'focus':
      return 'from-rose-500/20 to-orange-500/20 text-rose-500'
    case 'short-break':
      return 'from-teal-500/20 to-emerald-500/20 text-teal-500'
    case 'long-break':
      return 'from-blue-500/20 to-indigo-500/20 text-blue-500'
  }
})

const buttonThemeClasses = computed(() => {
  switch (currentMode.value) {
    case 'focus':
      return 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
    case 'short-break':
      return 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/30'
    case 'long-break':
      return 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30'
  }
})
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 transition-colors duration-1000 relative overflow-hidden">
    <!-- Dynamic Ambient Background -->
    <div 
      class="absolute inset-0 bg-gradient-to-br opacity-50 blur-[100px] transition-all duration-1000 -z-10"
      :class="themeClasses"
    ></div>

    <main class="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
      
      <!-- Top Stats -->
      <div class="w-full flex justify-between items-center mb-8">
        <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Pomodoro
        </h1>
        <div class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Brain class="w-4 h-4 text-rose-400" />
          <span class="text-sm font-medium text-neutral-300">
            {{ sessionsCompleted }} Sessions
          </span>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="flex p-1 bg-black/40 rounded-full mb-10 border border-white/5 backdrop-blur-md">
        <button 
          @click="setMode('focus')"
          class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="currentMode === 'focus' ? 'bg-white/10 text-rose-400 shadow-sm' : 'text-neutral-400 hover:text-neutral-200'"
        >
          <Brain class="w-4 h-4" /> Focus
        </button>
        <button 
          @click="setMode('short-break')"
          class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="currentMode === 'short-break' ? 'bg-white/10 text-teal-400 shadow-sm' : 'text-neutral-400 hover:text-neutral-200'"
        >
          <Coffee class="w-4 h-4" /> Short
        </button>
        <button 
          @click="setMode('long-break')"
          class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="currentMode === 'long-break' ? 'bg-white/10 text-blue-400 shadow-sm' : 'text-neutral-400 hover:text-neutral-200'"
        >
          <Wind class="w-4 h-4" /> Long
        </button>
      </div>

      <!-- Timer Display (Circular Progress) -->
      <div class="relative w-64 h-64 mb-10 flex items-center justify-center">
        <!-- SVG Progress Circle -->
        <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <!-- Track -->
          <circle 
            cx="50" cy="50" r="46" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            class="text-white/5" 
          />
          <!-- Progress -->
          <circle 
            cx="50" cy="50" r="46" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="3"
            stroke-linecap="round"
            :class="themeClasses.split(' ')[2]"
            class="transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            :stroke-dasharray="2 * Math.PI * 46"
            :stroke-dashoffset="2 * Math.PI * 46 * (1 - (totalTime - timeLeft) / totalTime)"
          />
        </svg>

        <!-- Time Text -->
        <div class="text-6xl font-black tabular-nums tracking-tighter" :class="themeClasses.split(' ')[2]">
          {{ formattedTime }}
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-6">
        <button 
          @click="toggleTimer"
          class="flex items-center justify-center w-20 h-20 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95"
          :class="buttonThemeClasses"
        >
          <Pause v-if="isRunning" class="w-8 h-8" />
          <Play v-else class="w-8 h-8 ml-1" />
        </button>

        <button 
          @click="resetTimer"
          class="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
          title="Reset Timer"
        >
          <RotateCcw class="w-5 h-5" />
        </button>
      </div>

    </main>
  </div>
</template>

<style>
/* Smooth font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
