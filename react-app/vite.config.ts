import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '../website',
    emptyOutDir: false, // Keep static files we copied (_headers, CNAME, etc.)
  },
});
