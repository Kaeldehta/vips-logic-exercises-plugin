import { defineConfig, PluginOption } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin() as PluginOption],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: "src/main.tsx",
    },
    target: "esnext",
    manifest: true,
  },
  experimental: {
    buildAdvancedBaseOptions: {
      runtime: (url: string) => `window.__toCompleteUrl(${url})`,
    },
  },
});
