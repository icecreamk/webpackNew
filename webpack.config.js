const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
            },
          ],
        },
      ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};