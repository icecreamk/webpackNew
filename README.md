#### 执行命令的几种方式
- npm i a -g `a --version`
- npm i a -D `npx a --version`
- npm i a -D `npm run start` (start 执行a命令)

#### url-loader、file-loader
- 两者都可以处理图片文件
- url-loader可以将图片处理成base64,使得图片请求数减少

#### loader的执行顺序从下至上，从右向左

### souce-map 最佳实践
- cheap 错误地方只精确到行，不精确到列
- module 第三方库的报错也会提示
- inline map文件不单独生成，而是内联在js文件里
- eval 使用js的eval语法
- 开发环境建议: cheap-module-eval-source-map
- 生产环境建议: cheap-module-source-map

### Hot Module Replacement 热模块替换
- 对于css,样式更新后不会刷新整个页面
- 对于js,js更新后，可以指定需要刷新的模块，而不是整个页面刷新

##### js实现hmr需要以下这段代码，css不需要是因为css-loader内部已经帮忙实现了
``` javascript
if (module.hot) {
    // 当number模块更新时，执行number方法
    module.hot.accept('./number', () => {
        document.body.removeChild(document.getElementById('number'))
        number()
    })
}
```

##### 按需加载polyfill
``` javascript
presets: [['@babel/preset-env', {
    useBuiltIns : 'usage'
}]]
```

##### 指定babel转译需要兼容的浏览器
``` javascript
presets: [['@babel/preset-env', {
    targets: {
        chrome: '67'
    },
    useBuiltIns : 'usage'
}]]
```

##### 业务代码和类库代码区别
###### 写业务代码时，配置presets及引入polyfill
``` javascript
// webpack.config.js
presets: [['@babel/preset-env', {
	targets: {
		chrome: '67'
	},
	useBuiltIns : 'usage'
}]]
// index.js
import '@babel/polyfill'
```

###### 写库代码时，由于preset-env和polyfill污染全局环境，故使用`plugins`配置更加合理
``` javascript
'plugins': [['@babel/plugin-transform-runtime', {
    'corejs': 2,
    'helpers': true,
    'regenerator': true,
    'useESModules': false
}]]
```

##### .babelrc
由于babel在webpack.config中的配置代码较长，所以建议移到`.babelrc`中实现
