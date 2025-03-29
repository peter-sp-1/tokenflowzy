import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['crypto', 'buffer', 'process', 'util', 'stream', 'events'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  define: {
    'process.env.ANCHOR_BROWSER': true,
    'process.env': process.env,
    global: 'globalThis',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      path: "path-browserify",
      os: path.resolve(__dirname, "./src/polyfills/os.ts"),
    },
  },
  build: {
    rollupOptions: {
      plugins: []
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: [
      'buffer', 
      'crypto-browserify', 
      'events', 
      'stream-browserify',
      'util'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})

