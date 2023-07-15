import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/meta": {
        target: "https://fonts.google.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/meta/, ""),
      },
      "/tester": {
        target: "https://fonts.google.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tester/, ""),
      },
    },
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  plugins: [react()],
});
