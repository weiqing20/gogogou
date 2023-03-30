const router = require('koa-router')()
const { getShopList, getShopById, getProducts } = require('../controller/shop')
const { ErrorModel, SuccessModel } = require('../res-model/index')

router.prefix('/api/shop')

// 获取商店列表
router.get('/hot-list', async function (ctx, next) {
  const shopList = await getShopList()
  ctx.body = new SuccessModel(shopList)
})

// 获取单个商店信息
router.get('/:id', async function (ctx, next) {
  const id = ctx.params.id
  const shop = await getShopById(id)
  ctx.body = new SuccessModel(shop)
})

// 获取单个商店的商品列表
router.get('/:id/products', async function (ctx, next) {
  const shopId = ctx.params.id
  const tab = ctx.query.tab || 'all'
  const products = await getProducts(shopId, tab)
  ctx.body = new SuccessModel(products)
})

module.exports = router