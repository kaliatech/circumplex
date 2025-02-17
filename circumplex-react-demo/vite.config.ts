import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: '../node_modules/.cache/vite/circumplex-react-demo',
  plugins: [react()],
})
