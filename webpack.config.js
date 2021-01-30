const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
	  contentBase: './dist',
	  open: true,
	  port: 8080,
	  hot: true,
	  hotOnly: true
  },
  module: {
    rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.css$/,
			use: [
				'style-loader', 
        'css-loader',
				{ 
          loader: 'postcss-loader'
        }
			]
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
  },
  plugins: [
	  new HtmlWebpackPlugin({
		template: 'src/index.html'
	  }),
	  new CleanWebpackPlugin(),
	  new webpack.HotModuleReplacementPlugin()
	],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};