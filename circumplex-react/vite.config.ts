import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { extname, join } from 'path'
import { readdirSync } from 'fs'
import dts from 'vite-plugin-dts'

// patterns to exclude from the build
const excludePatterns = [
  '**/*.spec.ts',
  '**/*.test.ts',
  '**/*.spec.tsx',
  '**/*.test.tsx',
  '**/*.spec.js',
  '**/*.test.js',
  '**/*.spec.jsx',
  '**/*.test.jsx',
  '**/*.stories.ts',
  '**/*.stories.js',
  '**/*.stories.jsx',
  '**/*.stories.tsx',
]

// check if a file should be excluded from the build
function shouldExclude(fileName: string) {
  return excludePatterns.some((pattern) => {
    const suffix = pattern.replace('**/*', '') // remove the `**/*` since we're dealing with final filenames only
    return fileName.endsWith(suffix)
  })
}

// get all source files in a directory
function getAllSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true })
  let files: string[] = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files = files.concat(getAllSourceFiles(fullPath))
    } else if (entry.isFile()) {
      const ext = extname(entry.name)
      // console.log(shouldExclude(entry.name) && fullPath)
      if ((ext === '.ts' || ext === '.tsx') && !shouldExclude(entry.name)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

const srcDir = `src`

// get all source files in the `src` directory
const sourceFiles = getAllSourceFiles(srcDir)

//  process.exit(1)

// map each file to an entry name
const entries = Object.fromEntries(
  sourceFiles.map((filePath) => {
    const relativePath = filePath.slice(srcDir.length + 1)
    const entryName = relativePath.replace(/\.(ts|tsx)$/, '')
    return [entryName, filePath]
  }),
)

console.log('entries', entries)
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: false,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: entries,
      name: '@kaliatech/circumplex-react',
      formats: ['es'],
    },
    rollupOptions: {
      //external: ['react', 'react-dom'],
      //external: (source, _importer, _isResolved) => {
      external: (source) => {
        // console.log('source', source)
        // console.log('importer', importer)
        // console.log('isResolved', isResolved)
        return (
          source.includes('/node_modules/') ||
          (source.includes('/circumplex') && !source.includes(`/circumplex-react/`))
        )
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
