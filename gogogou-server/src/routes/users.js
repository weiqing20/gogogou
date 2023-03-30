const router = require('koa-router')()
const { register, login } = require('../controller/user')
const { ErrorModel, SuccessModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/user')

// 注册
router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body
  try {
    const newUser = await register(username, password)
    // ctx.body = {
    //   errno: 0,
    //   data: newUser // 多返回一些数据，防止前端有需求变动，再找后端修改
    // }
    ctx.body = new SuccessModel(newUser)
  } catch (ex) {
    console.log(ex)
    // ctx.body = {
    //   errno: 1001,  // 不同错误用不同 errno
    //   message: `注册失败 - ${ex.message}`
    // }
    ctx.body = new ErrorModel(1001, `注册失败 - ${ex.message}`)
  }
})

// 登录
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const result = await login(username, password)
  if (result) {
    // 设置 session
    ctx.session.userInfo = { username }
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel(1002, '用户名或密码错误')
  }
})

// 获取用户信息
router.get('/info', loginCheck, async function (ctx, next) {
  // 加了 loginChenck 之后，因为保证了必须登录
  const session = ctx.session
  ctx.body = new SuccessModel(session.userInfo)
});

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router
