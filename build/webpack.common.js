const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require("webpack");
// const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
  }),
  new CleanWebpackPlugin(),
];

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file),
    }));
  }
  if (/.*\.dll.js/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      mainfest: path.resolve(__dirname, '../dll', file),
    }));
  }
});

const commontConfig = {
  devServer: {
    overlay: true,
  },
  entry: "./src/index.js",
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
        options: {
          env: {
            development: {
              compact: false,
            },
          },
        },
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: "eslint-loader",
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  plugins,
  optimization: {
    usedExports: true, // 这里在生产环境会帮忙配置可以不用写
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
        },
      },
    },
  },
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(commontConfig, prodConfig);
  } else {
    return merge(commontConfig, devConfig);
  }
};
