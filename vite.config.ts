import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7117",
        changeOrigin: true,
      },
      "/user_profile": {
        target: "http://localhost:7117",
        changeOrigin: true,
      },
    },
  },
});
