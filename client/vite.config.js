import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Only used in development
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
      "/api/google-places": {
        target: "https://maps.googleapis.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/api\/google-places/, "/maps/api/place/nearbysearch"),
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
