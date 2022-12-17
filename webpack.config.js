const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './client/src/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
};