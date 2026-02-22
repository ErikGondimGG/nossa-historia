import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Polling necessário dentro do Docker/WSL2 (sem inotify nativo)
      usePolling: process.env.VITE_POLLING === 'true',
    },
  },
})
