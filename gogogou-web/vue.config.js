// 1. 在项目根目录下创建vue.config.js文件，编写配置
// 2. npm run build 打包代码
// 3. 把代码给后端
// 4. 后端把前端代码放入后端工程
// 5. 后端重启后端服务
// * 容易出问题的就是下面的配置
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/gogogou'
})
