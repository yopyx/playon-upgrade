import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/resources_api": {
        target: "http://localhost:7117",
        changeOrigin: true,
      },
    },
  },
});
