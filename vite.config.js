import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      routes: path.resolve(__dirname, './src/routes'), 
      'components': path.resolve(__dirname, './src/components'),
      'context': path.resolve(__dirname, './src/context'),
      'pages': path.resolve(__dirname, './src/pages'),
      'config': path.resolve(__dirname, './src/config'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'utils': path.resolve(__dirname, './src/utils'),
      '@': path.resolve(__dirname, './src'),

    },
  },

});
