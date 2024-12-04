import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        base: '/',
        plugins: [
            react(),
            // Avoid using 'vite-plugin-commonjs' unless necessary; Vite handles most CommonJS cases.
        ],
        resolve: {
            alias: {
                stream: 'stream-browserify',
                buffer: 'buffer',
                process: 'process/browser',
                crypto: 'crypto-browserify',
            },
        },
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        buffer: true,
                        process: true,
                    }),
                    NodeModulesPolyfillPlugin(),
                ],
            },
        },
        define: {
            'process.env': env, // Use Vite's `loadEnv` to load environment variables
            global: 'globalThis',
        },
        server: {
            port: env.VITE_APP_PORT ? parseInt(env.VITE_APP_PORT) : 3000,
        },
    };
});
