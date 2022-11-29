import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'BetterBrightdataIDE',
      // the proper extensions will be added
      fileName: 'content-script',
      formats: ['iife']
    },
    outDir: '../extension',
    emptyOutDir: false,
    minify: false,
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    //   external: ['jquery'],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       $: '$',
    //     }
    //   }
    // }
  }
})