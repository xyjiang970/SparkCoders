import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/SparkCoders/react_and_useState/dist/",
  plugins: [react()],
})
