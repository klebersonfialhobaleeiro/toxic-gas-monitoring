const path = require('path');

module.exports = {
  entry: {
    'bundle.js': [
      path.resolve(__dirname, 'src/index.js'),
      path.resolve(__dirname, 'src/layout.js')
    ]
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development'
};