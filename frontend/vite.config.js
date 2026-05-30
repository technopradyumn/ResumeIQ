import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/auth':    'http://localhost:5000',
      '/resume':  'http://localhost:5000',
      '/contact': 'http://localhost:5000',
    },
  },
})
