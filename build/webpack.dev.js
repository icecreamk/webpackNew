const webpack = require('webpack')
const {merge} = require('webpack-merge')
const commontConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          { 
            loader: 'postcss-loader'
          }
        ]
      },
    ]
  },
  plugins: [
	  new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].js', // 入口打包文件
    chunkFilename: '[name].js' // 其他打包文件
  },
}

module.exports = devConfig