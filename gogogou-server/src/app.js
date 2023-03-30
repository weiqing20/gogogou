const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const address = require('./routes/address')
const shop = require('./routes/shop')
const order = require('./routes/order')

// error handler
onerror(app)

// cors 配置
app.use(cors({
  // 设置单个跨域的前端 origin
  origin: 'http://localhost:8080',

  // 设置多个跨域的前端 origin
  // origin: (ctx) => {
  //   // 可跨域白名单
  //   const allowCross = ['http://localhost:8081', 'http://localhost:8082']
  //   // 去掉 referer 结尾
  //   let url = ctx.header.referer.substr(0, ctx.header.referer.length)
  //   // 判断是否在白名单，是则返回地址
  //   if (allowCross.includes(url)) {
  //     return url
  //   }
  //   // 默认本地请求 8080 端口可跨域
  //   return 'http://localhost:8080'
  // },
  credentials: true // 允许跨域携带 cookie
}))

// session 配置
app.keys = ['an4*j5%B=_q[?o#C6'] // 密钥
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true, // 只能后端修改 cookie，不允许前端 js 修改
    maxAge: 24 * 60 * 60 * 1000
  }
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 让 public 目录下的文件被当作静态文件访问
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(address.routes(), address.allowedMethods())
app.use(shop.routes(), shop.allowedMethods())
app.use(order.routes(), order.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
