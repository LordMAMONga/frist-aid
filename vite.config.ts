import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Кэшируем все статические файлы
      },
      manifest: {
        name: "First Aid",
        short_name: "FirstAid",
        description: "Экстренный справочник первой помощи",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  base: "/frist-aid/",
});
