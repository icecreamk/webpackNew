const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const procConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          { 
            loader: 'postcss-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接引用的文件
      chunkFilename: '[name].chunk.[contenthash].css', // 间接引用的文件
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  output: {
    // contenthash会根据文件内容是否变化而改变
    filename: '[name].[contenthash].js', // 入口打包文件
    chunkFilename: '[name].[contenthash].js' // 其他打包文件
  }
};

module.exports = procConfig
