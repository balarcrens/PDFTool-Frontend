import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group and isolate PDF manipulation engines
            if (id.includes('pdf-lib')) {
              return 'pdf-lib';
            }
            if (id.includes('pdfjs-dist')) {
              return 'pdfjs-dist';
            }
            if (id.includes('jspdf') || id.includes('html2pdf.js')) {
              return 'jspdf-html2pdf';
            }
            if (id.includes('mammoth')) {
              return 'mammoth';
            }
            // Isolate framer-motion so it loads only when needed
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Dedicated bundle for framework core routines
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'react-core';
            }
            return 'vendor'; // standard node_modules generic fallback
          }
        }
      }
    },
    chunkSizeWarningLimit: 900
  }
})
