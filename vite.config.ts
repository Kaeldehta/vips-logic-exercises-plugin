import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin(), eslintPlugin()],
  build: {
    rollupOptions: {
      input: "src/main.tsx",
    },
    target: "esnext",
    polyfillDynamicImport: false,
    manifest: true,
  },
});
