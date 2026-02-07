import { ref, computed, onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'ol-theme'

const theme = ref<Theme>('system')

function getSystemPreference(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const isDark = computed(() => {
    if (theme.value === 'system') return getSystemPreference()
    return theme.value === 'dark'
  })

  function applyTheme() {
    if (typeof document === 'undefined') return
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setTheme(value: Theme) {
    theme.value = value
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, value)
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  onMounted(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        theme.value = stored
      }
    }
    applyTheme()

    if (typeof window !== 'undefined') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
    }
  })

  watch(isDark, applyTheme)

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
