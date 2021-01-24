#### 执行命令的几种方式
- npm i a -g `a --version`
- npm i a -D `npx a --version`
- npm i a -D `npm run start` (start 执行a命令)

#### url-loader、file-loader
- 两者都可以处理图片文件
- url-loader可以将图片处理成base64,使得图片请求数减少

#### loader的执行顺序从下至上，从右向左