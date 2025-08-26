import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    open: true
  },
  preview: {
    port: 3500,
    host: '127.0.0.1',
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'assets/[name].[hash].css';
          }
          return 'assets/[name].[hash].[ext]';
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    // Ensure proper module format for production
    target: 'esnext',
    modulePreload: false,
    // Add proper MIME type handling
    assetsInlineLimit: 0
  },
  // Add base path if deploying to subdirectory
  base: './',
  // Ensure proper module resolution
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
