import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import path from 'path' // 处理路径问题

import mockData from './mock/index.js'

// Vite 插件：开发环境拦截 /api 请求，返回 mock 数据
function viteMockServer() {
  return {
    name: 'mock-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const method = req.method.toUpperCase()
        const path = req.url.split('?')[0]
        const mock = mockData[`${method} ${path}`]
        if (!mock) return next()

        const send = (data, delay = 300) => {
          setTimeout(() => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json;charset=utf-8')
            res.end(JSON.stringify(data))
          }, delay)
        }

        if (typeof mock === 'function') {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const body = chunks.length ? JSON.parse(Buffer.concat(chunks)) : {}
          send(mock(body))
        } else {
          send(mock)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteMockServer(),
  ],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': path.resolve(__dirname, './src') // 将@指向src目录，方便导入src目录下的文件
    },
  },
})
