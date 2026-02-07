import type { Config } from 'tailwindcss'

/**
 * @openleap-io/ui-common-library Tailwind Preset
 *
 * Usage in consuming app:
 *   import openleapPreset from '@openleap-io/ui-common-library/tailwind-preset'
 *   export default { presets: [openleapPreset], ... }
 */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background:  'var(--ol-bg-primary)',
        foreground:  'var(--ol-text-primary)',
        muted:       {
          DEFAULT:    'var(--ol-bg-tertiary)',
          foreground: 'var(--ol-text-muted)',
        },
        accent: {
          DEFAULT:    'var(--ol-bg-accent)',
          foreground: 'var(--ol-text-primary)',
        },
        border:      'var(--ol-border-default)',
        ring:        'var(--ol-border-focus)',
        product: {
          DEFAULT:   'var(--product-primary)',
          secondary: 'var(--product-secondary)',
          accent:    'var(--product-accent)',
          surface:   'var(--product-surface)',
        },
        status: {
          active:     'var(--ol-status-active)',
          warning:    'var(--ol-status-warning)',
          error:      'var(--ol-status-error)',
          info:       'var(--ol-status-info)',
          planned:    'var(--ol-status-planned)',
          deprecated: 'var(--ol-status-deprecated)',
        },
      },
      fontFamily: {
        sans: ['var(--ol-font-sans)'],
        mono: ['var(--ol-font-mono)'],
      },
      borderRadius: {
        sm: 'var(--ol-radius-sm)',
        md: 'var(--ol-radius-md)',
        lg: 'var(--ol-radius-lg)',
        xl: 'var(--ol-radius-xl)',
      },
    },
  },
} satisfies Partial<Config>
