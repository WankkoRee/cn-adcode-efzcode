import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    tsconfig: 'tsconfig.build.json',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    minify: 'terser',
    esbuildOptions(options, context) {
        options.charset = 'utf8'
    },
})
