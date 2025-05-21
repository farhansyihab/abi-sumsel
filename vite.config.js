import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { VitePWA } from 'vite-plugin-pwa'
import { createRequire } from 'node:module';
import { visualizer } from 'rollup-plugin-visualizer'


const require = createRequire( import.meta.url );

export default defineConfig({
    build: {
    rollupOptions: {
      output: {
        manualChunks: {
          countdown: ['vue3-flip-countdown'],
        }
      }
    }
  },
  plugins: [
    vue(), 
    VitePWA({
      manifest:{
        icons: [
          {src: "/img/icons/android-launchericon-48-48.png", sizes: "48x48", type: "image/png", purpose: "any maskable"},
          {src: "/img/icons/android-launchericon-72-72.png", sizes: "72x72", type: "image/png", purpose: "any maskable"},
          {src: "/img/icons/android-launchericon-96-96.png", sizes: "96x96", type: "image/png", purpose: "any maskable"},
          {src: "/img/icons/android-launchericon-144-144.png", sizes: "144x144", type: "image/png", purpose: "any maskable"},
          {src: "/img/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable"},
          {src: "/img/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable"},
        ]
      }
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-build-classic' ) } )
  ],
  worker: {
    format: 'es', // Format ES Modules
    plugins: []   // Tambahan plugin jika diperlukan
  },
  resolve: {
    alias: {
      '@': fileURLToPath( new URL( './src', import.meta.url ) ),
      '@worker': fileURLToPath( new URL( './src/workers', import.meta.url ) ),
    }
  }
})