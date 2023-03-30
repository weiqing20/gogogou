const router = require('koa-router')()
const { ErrorModel, SuccessModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')
const { createAddress, getAddressList, getAddressById, updateAddress } = require('../controller/address')

router.prefix('/api/user/address')

// 创建收货地址
router.post('/', loginCheck, async function (ctx, next) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const data = ctx.request.body
  try {
    const newAddress = await createAddress(username, data)
    ctx.body = new SuccessModel(newAddress)
  } catch (ex) {
    console.log(ex)
    ctx.body = new ErrorModel(2001, '创建收货地址失败')
  }
})

// 获取收货地址列表
router.get('/', loginCheck, async function (ctx, next) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const addressList = await getAddressList(username)
  if (addressList != null) {
    ctx.body = new SuccessModel(addressList)
  } else {
    ctx.body = new ErrorModel(2002, '无收货地址')
  }
})

// 获取单个收货地址
// 为了安全，可以模仿更新收货地址，加入登录验证并传入 username，避免查询到的地址信息不是自己的
router.get('/:id', loginCheck, async function (ctx, next) {
  const id = ctx.params.id
  const address = await getAddressById(id)
  if (address != null) {
    ctx.body = new SuccessModel(address)
  } else {
    ctx.body = new ErrorModel(2003, '未找到收货地址')
  }
})

// 更新收货地址
router.patch('/:id', loginCheck, async function (ctx, next) {
  const id = ctx.params.id
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const data = ctx.request.body
  try {
    const newAddress = await updateAddress(id, username, data)
    if (newAddress != null) {
      ctx.body = new SuccessModel(newAddress)
    } else {
      ctx.body = new ErrorModel(2004, '未找到收货地址')
    }
  } catch (ex) {
    console.log(ex)
    ctx.body = new ErrorModel(2005, '更新收货地址失败')
  }
})

module.exports = router