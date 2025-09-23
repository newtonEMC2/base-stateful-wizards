import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const isProduction = process.env.NODE_ENV === 'production'

// Base configuration for JavaScript builds
const baseConfig = {
  input: 'src/index.tsx',
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false, // We'll handle declarations separately
      declarationMap: false,
    }),
  ],
}

// Configuration for ESM build
const esmConfig = {
  ...baseConfig,
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: !isProduction,
  },
}

// Configuration for CommonJS build
const cjsConfig = {
  ...baseConfig,
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: !isProduction,
  },
}

// Configuration for TypeScript declarations
const dtsConfig = {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [
    dts({
      tsconfig: './tsconfig.build.json',
    }),
  ],
  external: ['react', 'react-dom'],
}

export default [esmConfig, cjsConfig, dtsConfig]
