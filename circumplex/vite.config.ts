import { defineConfig } from 'vite'
import path from 'path'

import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: false,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Circumplex',
      fileName: (format) => `circumplex.${format}.js`,
    },
    // rollupOptions: {
    //   external: ['react', 'react-dom'],
    //   output: {
    //     globals: {
    //       react: 'React',
    //       'react-dom': 'ReactDOM',
    //     },
    //   },
    // },
  },
})
