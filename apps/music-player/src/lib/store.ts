import { ref } from 'vue'

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  duration: number // seconds
}

export const MOCK_TRACKS: Track[] = [
  { id: 't1', title: 'Midnight City', artist: 'Neon Lights', album: 'Synthwave Dreams', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400', duration: 215 },
  { id: 't2', title: 'Ocean Breeze', artist: 'Chill Vibes', album: 'Summer Mix', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400', duration: 180 },
  { id: 't3', title: 'Cyberpunk 2077', artist: 'Glitch Mob', album: 'Future Sounds', cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400', duration: 245 },
  { id: 't4', title: 'Acoustic Sunrise', artist: 'John Doe', album: 'Morning Coffee', cover: 'https://images.unsplash.com/photo-1460036521480-c4b508acaa35?auto=format&fit=crop&q=80&w=400', duration: 198 },
]

export function usePlayerStore() {
  const currentTrack = ref<Track>(MOCK_TRACKS[0])
  const isPlaying = ref(false)
  const progress = ref(0) // seconds
  const volume = ref(80) // 0-100

  // Simulation timer
  let interval: ReturnType<typeof setInterval> | null = null

  const togglePlay = () => {
    isPlaying.value = !isPlaying.value
    if (isPlaying.value) {
      interval = setInterval(() => {
        if (progress.value < currentTrack.value.duration) {
          progress.value += 1
        } else {
          nextTrack()
        }
      }, 1000)
    } else {
      if (interval) clearInterval(interval)
    }
  }

  const playTrack = (track: Track) => {
    if (currentTrack.value.id !== track.id) {
      currentTrack.value = track
      progress.value = 0
    }
    if (!isPlaying.value) togglePlay()
  }

  const nextTrack = () => {
    const idx = MOCK_TRACKS.findIndex(t => t.id === currentTrack.value.id)
    const nextIdx = (idx + 1) % MOCK_TRACKS.length
    currentTrack.value = MOCK_TRACKS[nextIdx]
    progress.value = 0
    if (!isPlaying.value) togglePlay()
  }

  const prevTrack = () => {
    const idx = MOCK_TRACKS.findIndex(t => t.id === currentTrack.value.id)
    const prevIdx = (idx - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length
    currentTrack.value = MOCK_TRACKS[prevIdx]
    progress.value = 0
    if (!isPlaying.value) togglePlay()
  }

  const seek = (time: number) => {
    progress.value = time
  }

  return {
    tracks: MOCK_TRACKS,
    currentTrack,
    isPlaying,
    progress,
    volume,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seek
  }
}
