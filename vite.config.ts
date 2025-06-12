import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Базовый путь для продакшн-сборки
  base: '/',
  // Настройки сборки
  build: {
    // Генерировать source maps для отладки
    sourcemap: true,
    // Очищать директорию перед сборкой
    emptyOutDir: true,
    // Настройки для CSS
    cssCodeSplit: true,
  },
});
