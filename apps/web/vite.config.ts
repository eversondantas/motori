import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'request-logger',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const start = Date.now();
          res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`[VITE] ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`);
          });
          next();
        });
      },
    },
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: false,
    hmr: {
      overlay: true,
    },
  },
  logLevel: 'info',
  clearScreen: false,
});
