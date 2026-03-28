import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/InnerSoul/" : "/",
  plugins: [react()],
  build: {
    esbuildOptions: {
      drop: ["console", "debugger"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "/src/assets/style/variables";
          @import "bootstrap/scss/mixins";
        `,
      },
    },
  },
});
