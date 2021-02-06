const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    externals: ["lodash"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        library: 'library', // 通过全局引入时，通过window.library也可使用
        libraryTarget: 'umd', // 支持多种模块化引入方式
    }
}