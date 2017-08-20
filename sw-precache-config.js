module.exports = {
  staticFileGlobs: [
    'dist/manifest.json',
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/**/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html'
};