import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

// Define all external dependencies that should not be bundled
const external = ['react', 'react-dom', 'react/jsx-runtime']

// Base configuration for JavaScript builds
const baseConfig = {
  input: 'src/index.tsx',
  external,
  plugins: [
    resolve({
      preferBuiltins: true,
      dedupe: ['react', 'react-dom'],
    }),
    commonjs(),
  ],
}

// Configuration for ESM build
const esmConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true, // Enable declaration generation
      declarationMap: true, // Enhanced IntelliSense: Better hover information and code navigation in editors like VS Code
      declarationDir: 'dist', // Output declarations to dist folder
    }),
  ],
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: !isProduction,
  },
}

// Configuration for CommonJS build
const cjsConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    typescript({
      tsconfig: './tsconfig.build.json',
      // Only generate declarations once (in ESM build). Typescript doesnt care about if is export or require,
      // because it translates this appropiatelly regardles of consuming code uses esm or cjs
      declaration: false,
      declarationMap: false,
    }),
  ],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: !isProduction,
  },
}

// Configuration for development build (includes React for testing)
const devConfig = {
  input: 'src/dev.tsx',
  external: [], // Don't externalize anything for dev build
  plugins: [
    resolve({
      preferBuiltins: false,
      browser: true, // Use browser versions of packages
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json', // Use main tsconfig for dev
      declaration: false,
      declarationMap: false,
    }),
    serve({
      open: true,
      contentBase: ['dist', 'public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({
      watch: 'dist',
    }),
  ],
  output: {
    file: 'dist/dev-bundle.mjs',
    format: 'esm',
    sourcemap: true,
  },
}

// Export different configs based on environment
export default isDev ? devConfig : [esmConfig, cjsConfig]
