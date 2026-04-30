/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'coverage'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/types.ts',
        'src/app/**',
        '**/*.stories.{js,jsx,ts,tsx}',
        '**/index.{js,ts}'
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/src': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@/lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@/providers': fileURLToPath(new URL('./src/providers', import.meta.url)),
      '@/services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@/types': fileURLToPath(new URL('./src/types', import.meta.url))
    }
  }
})