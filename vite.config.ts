import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'useHookTemplate',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react'],
        },
    },
    plugins: [react(), dts()],
})
