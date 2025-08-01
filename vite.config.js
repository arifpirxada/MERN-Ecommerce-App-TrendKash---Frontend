import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.jsx",
  })],

  // Proxy configration ->
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_SERVER_URL,
      }
    }
  }

})
