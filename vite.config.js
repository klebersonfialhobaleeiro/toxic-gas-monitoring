import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { homepage as base } from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
