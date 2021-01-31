const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  target: 'web',
  module: {
    rules: [{
			test: /\.js$/,
			exclude: '/node_modules/',
			loader: 'babel-loader',
			options: {
				// presets: [['@babel/preset-env', {
				// 	targets: {
				// 		chrome: '67'
				// 	},
				// 	useBuiltIns : 'usage'
				// }]]
				// 'plugins': [['@babel/plugin-transform-runtime', {
				// 	'corejs': 2,
				// 	'helpers': true,
				// 	'regenerator': true,
				// 	'useESModules': false
				// }]]
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
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // 入口打包文件
    chunkFilename: '[name].chunk.js' // 其他打包文件
  },
  plugins: [
	  new HtmlWebpackPlugin({
		template: 'src/index.html'
	  }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery', // 当使用$时，会自动帮助引入jquery库
      _join: ['lodash', 'join'] // 引用lodash的join方法
    })
  ],
  optimization: {
 	  usedExports: true, // 这里在生产环境会帮忙配置可以不用写
	  splitChunks: {
		  chunks: 'all'
	  }
  }
}