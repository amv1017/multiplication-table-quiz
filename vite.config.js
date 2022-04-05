import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build'
  },
  server: {
    port: 3000
  },
  base: 'https://amv1017.github.io/multiplication-table-quiz/'
})
