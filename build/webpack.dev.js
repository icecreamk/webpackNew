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
  plugins: [
	  new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true // 这里在生产环境会帮忙配置可以不用写
  }
}

module.exports = merge(commontConfig, devConfig)