// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// // import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     nodePolyfills({
//       // Specific modules that should not be polyfilled.
//       exclude: [],
//       // Whether to polyfill specific globals.
//       globals: {
//         Buffer: true,
//         global: true,
//         process: true,
//       },
//       // Whether to polyfill `node:` protocol imports.
//       protocolImports: true,
//     }),
//   ],
//   define: {
//     'process.env.ANCHOR_BROWSER': true,
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis',
//       },
      
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.ANCHOR_BROWSER': true
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
})

