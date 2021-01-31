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
import '@babel/polyfill' （使用usage后，会帮助引入polyfill，这里也可以不用引入）
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

#### tree shaking
- 只支持 ES Module
- 用于解决只引入某个模块的部分方法，但实际打包时会将所有方法打包进去
- `"sideEffects": ["@babel/polyfill"],` 表示不用对`@babel/polyfill`进行shaking时
- `"sideEffects": false` 表示没有不需要shaking的模块
- 由于开发模式需要调试，所以开发模式的shaking还是会将没引入的代码打包，但是会进行标记

``` javascript
export const add = () => {
    return a + b
}

export const minus = () => {
    return a - b
}
```

``` javascript
import { add } from "./math";

add()

```

#### code splitting
- 代码分割与webpack无关
- webpack中实现代码分割的两种方式
 + 同步代码，在webpack中配置`splitChunks`即可
 + 异步代码，无需任何配置，会自动进行代码分割(若需要其他代码分割有关的配置，也可以使用`splitChunks`)

 ``` javascript 同步代码
import _ from 'lodash'
var element = document.createElement('div')
element.innerHTML = _.join(['1', '2'], '***')
document.body.appendChild(element)


 ```
 ``` javascript 异步代码
function getComponent() {
    return import('lodash').then((_) => {
        var element = document.createElement('div')
        element.innerHTML = _.join(['1', '2'], '***')
        return element
    })
}

getComponent().then(element => {
    document.body.appendChild(element)
})
 ```


``` javascript
splitChunks = {
    chunks: 'async', // 对异步代码进行分割
    minSize: 20000, // 大于20kb进行分割
    minRemainingSize: 0,
    maxSize: 0, // 对分割对代码进行二次分割
    minChunks: 1, // 被使用多少次时进行代码分割
    maxAsyncRequests: 30, // 最多只分割多少个文件，超出后就不再进行分割
    maxInitialRequests: 30, // 入口文件只分割多少个文件，超出后不进行分割
    enforceSizeThreshold: 50000,
    cacheGroups: {
        defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true // 之前已经引入过模块，就不会打包，直接复用
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```

#### 代码的优化
- 可以通过控制台`cover`分析代码的使用率
- 异步的代码应该在使用时加载，不应该在首页加载

#### prefetch
- 在浏览器空闲时加载代码
- 缓存所能带来的性能优化有限，因关注如何让代码的利用率最高，例如交互后使用的代码可以写在异步组件中，通过懒加载的方式引入。若懒加载需要等待的时间较长，那么可以通过prefetch来提高用户体验。

#### preload
preload将会把资源得下载顺序权重提高，使得关键数据提前下载好

#### css 代码分割
- webpack 默认将css代码打包到js中
- `mini-css-extract-plugin` 由于该插件还不支持HMR，所以在生产环境使用