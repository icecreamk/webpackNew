const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('hello', options.name);
  // 等价与return
  this.callback(null, result);
};
