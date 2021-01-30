const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
	  new HtmlWebpackPlugin({
		template: 'src/index.html'
	  }),
	  new CleanWebpackPlugin(),
  ]
}