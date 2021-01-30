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
