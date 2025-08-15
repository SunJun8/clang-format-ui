import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/clang-format-ui/' : './', // Support both GitHub Pages and local development
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable sourcemaps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor'],
          react: ['react', 'react-dom'],
          vendor: ['zustand', 'yaml'],
          clangFormat: ['@wasm-fmt/clang-format']
        }
      }
    }
  },
  worker: {
    format: 'es'
  },
  optimizeDeps: {
    exclude: ['@wasm-fmt/clang-format']
  },
  define: {
    global: 'globalThis', // Fix for some WASM modules
  }
})