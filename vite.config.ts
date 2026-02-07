import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        nuxt: resolve(__dirname, 'src/nuxt.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        /^vue\//,
        'reka-ui',
        /^reka-ui\//,
        'lucide-vue-next',
        /^lucide-vue-next/,
        '@nuxt/kit',
        /^@nuxt/,
      ],
      output: {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        chunkFileNames: 'chunks/[name]-[hash].mjs',
        globals: {
          vue: 'Vue',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
})
