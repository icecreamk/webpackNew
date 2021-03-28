const { size } = require("lodash");

class CopyrightWebpackPlugin {
  constructor(options) {
    console.log("插件使用了", options);
  }

  apply(compiler) {
    compiler.hooks.emit.tap("CopyrightWebpackPlugin", (compilation) => {
        console.log("同步 代码打包到dist之前");
    })

    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        console.log("异步 代码打包到dist之前");
        compilation.assets["copyright.txt"] = {
          source: function () {
              return 'test'
          },
          size: function () {
              return 4
          }
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
