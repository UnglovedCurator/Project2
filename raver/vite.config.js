import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {
      VITE_CONTENTFUL_SPACE_ID: JSON.stringify(process.env.VITE_CONTENTFUL_SPACE_ID),
      VITE_CONTENTFUL_ACCESS_TOKEN: JSON.stringify(process.env.VITE_CONTENTFUL_ACCESS_TOKEN),
    }
  },
  optimizeDeps: {
    exclude: ['contentful'] ['lodash']
  },
  clearScreen: false,
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  }
});
