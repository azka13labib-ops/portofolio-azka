import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portofolio-azka/', // WAJIB DITAMBAHKAN AGAR GAMBAR & CSS TIDAK ERROR
})