import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { blogPlugin } from "./plugins/blog";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), blogPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      // prevent index.html from ever being cached
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  },
});
