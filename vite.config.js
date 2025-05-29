import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": "http://192.168.1.53:8888",
    },
    host: "0.0.0.0",
    port: 3000,
  },
});