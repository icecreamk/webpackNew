const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js');


const commontConfig = {
  entry: './src/index.js',
  target: 'web',
  module: {
    rules: [{
			test: /\.js$/,
			exclude: '/node_modules/',
			loader: 'babel-loader',
			options: {
				"env": {
					"development" : {
						"compact": false
					}
				}
			}
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		},  {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}]
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
	  new HtmlWebpackPlugin({
		template: 'src/index.html'
	  }),
    new CleanWebpackPlugin()
  ],
  optimization: {
 	  usedExports: true, // 这里在生产环境会帮忙配置可以不用写
	  splitChunks: {
		  chunks: 'all',
		  cacheGroups: {
			  vendors: {
				  test: /[\\/]node_modules[\\/]/,
				  priority: -10,
				  name: 'vendors'
			  }
		  }
	  }
  }
}

module.exports = (env) => {
	if (env && env.production) {
		return merge(commontConfig,prodConfig)
	} else {
		return merge(commontConfig,devConfig)
	}
}