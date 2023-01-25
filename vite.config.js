import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // https: {
    //   // key: fs.readFileSync('./.cert/server.key'),
    //   // cert: fs.readFileSync('./.cert/server.crt'),
    //   // ca: fs.readFileSync("./.cert/rootCA.pem")
    //   key: fs.readFileSync('./.cert2/rec.la-key.pem'),
    //   cert: fs.readFileSync('./.cert2/rec.la-cert.crt'),
    //   ca: fs.readFileSync("./.cert2/rec.la-ca.crt")
    // },
    port: 8000
  },
})
