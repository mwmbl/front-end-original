import legacy from '@vitejs/plugin-legacy'

export default {
  root: './src',
  publicDir: '../assets',
  build: {
    outDir: '../dist'
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ]
}
