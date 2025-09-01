import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/images": "http://localhost:5500", // Backend ka URL
      "/api": "http://localhost:5500"
    }
  }
});
