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
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'react-core';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 900
  }
})
