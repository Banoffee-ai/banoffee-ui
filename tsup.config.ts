import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  injectStyle: false,         // CSS is shipped separately as styles.css
  treeshake: true,
  minify: false,              // Let consuming apps minify
  banner: {
    js: `'use client';`,      // Next.js compatibility
  },
})
