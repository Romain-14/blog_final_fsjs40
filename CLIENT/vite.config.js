import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/img': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false,
            },
            '/api/v1': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});