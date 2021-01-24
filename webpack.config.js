const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
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
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|ttf|svg)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
  },
  plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html'
	}), new CleanWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};