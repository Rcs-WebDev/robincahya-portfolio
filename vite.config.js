import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = Boolean(process.env.VERCEL || process.env.NETLIFY)
const isProd = process.env.NODE_ENV === 'production'
const repoBase = isVercel ? '/' : (isProd ? '/robincahya-portfolio/' : '/')

// https://vitejs.dev/config/
export default defineConfig({
  base: repoBase,
  plugins: [
    react(),
    {
      name: 'github-pages-asset-prefix',
      transform(code, id) {
        if (!isVercel && isProd && id.includes('/src/') && (id.endsWith('.js') || id.endsWith('.jsx'))) {
          return {
            code: code
              .replace(/(['"])\/images\//g, `$1${repoBase}images/`)
              .replace(/(['"])\/videos\//g, `$1${repoBase}videos/`),
            map: null
          }
        }
      }
    }
  ],
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    watch: {
      ignored: ['**/public/videos/**']
    }
  }
})
