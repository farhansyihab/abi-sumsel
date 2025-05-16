import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { VitePWA } from 'vite-plugin-pwa'
import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );

export default defineConfig({
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
    ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-build-classic' ) } )
  ],
  resolve: {
    alias: {
      '@': fileURLToPath( new URL( './src', import.meta.url ) )
    }
  }
})