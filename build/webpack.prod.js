const {merge} = require('webpack-merge')
const commontConfig = require('./webpack.common.js')

const procConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map'
};

module.exports = merge(commontConfig, procConfig)
