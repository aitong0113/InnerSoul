import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/InnerSoul/" : "/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "/src/assets/variables"; 
          @import "bootstrap/scss/mixins";
        `,
      },
    },
  },
});
