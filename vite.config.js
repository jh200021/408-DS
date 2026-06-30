import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    rollupOptions: {
      output: {
        // Split the rarely-changing framework code into its own long-cached
        // vendor chunk so app updates don't force users to re-download React.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
