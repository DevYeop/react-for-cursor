import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['.ngrok-free.app'], // ngrok에서 생성한 모든 서브도메인 허용
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
});
