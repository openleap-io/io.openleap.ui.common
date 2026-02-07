import { computed } from 'vue'
import { useMediaQuery } from './useMediaQuery'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export function useBreakpoints() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTabletQuery = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')
  const isDesktopQuery = useMediaQuery('(min-width: 1025px)')

  const isTablet = computed(() => isTabletQuery.value)
  const isDesktop = computed(() => isDesktopQuery.value)

  const current = computed<Breakpoint>(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
    current,
  }
}
