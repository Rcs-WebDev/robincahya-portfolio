import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isProd = process.env.NODE_ENV === 'production'
const repoBase = '/robincahya-portfolio/'

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? repoBase : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-asset-prefix',
      transform(code, id) {
        if (isProd && id.includes('/src/') && (id.endsWith('.js') || id.endsWith('.jsx'))) {
          return {
            code: code.replace(/(['"])\/images\//g, `$1${repoBase}images/`),
            map: null
          }
        }
      }
    }
  ],
  server: {
    port: 5188,
    strictPort: true,
    host: true
  }
})
