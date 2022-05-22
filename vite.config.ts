import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import fg from "fast-glob";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    // rollupOptions: {
    //   input: fg.sync("./src/views/**/*.tsx"),
    // },
    manifest: true,
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
