const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('hello', options.name);
  const callback = this.async();
  // 打包结果就会延迟两秒
  setTimeout(() => {
    return callback(null, result);
  }, 2000);
};
