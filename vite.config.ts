import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/algorithm-visualizer/',
  plugins: [react()],
});