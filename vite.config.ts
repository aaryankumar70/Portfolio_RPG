import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'exclude-concept-assets',
      closeBundle() {
        // Exclude large concept art crops from final production distribution bundle
        const distConcept = path.resolve(__dirname, 'dist/assets/concept');
        if (fs.existsSync(distConcept)) {
          fs.rmSync(distConcept, { recursive: true, force: true });
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: false
  }
});
