import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      contexts: path.resolve(__dirname, "./src/contexts"),
      components: path.resolve(__dirname, "./src/components"),
      theme: path.resolve(__dirname, "./src/theme"),
      service: path.resolve(__dirname, "./src/service"),
    },
  },
});
