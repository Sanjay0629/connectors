import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Sub-path: bakes /connectors/ into all asset URLs in the production build
  base: '/connectors/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: false,
    proxy: {
      '/connectors/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/connectors/, ''),
      },
      '/connectors/ws': {
        target: process.env.VITE_BACKEND_WS_URL || 'ws://localhost:8000',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/connectors/, ''),
      },
      '/connectors/uploads': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/connectors/, ''),
      },
    },
  },
  manifest: true,
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})

