/**
 * @description 模拟商店数据操作
 */

const Shop = require('../../models/Shop')

!(async () => {
  // // 模拟操作前，需创建两个商店
  // await Shop.create({
  //   name: '沃尔玛',
  //   imgUrl: '/images/shop/wmt.jpeg',
  //   sales: 10000,
  //   expressLimit: 0,
  //   expressPress: 5,
  //   slogan: 'VIP尊享满50元免配送费...'
  // })
  // await Shop.create({
  //   name: '山姆会员',
  //   imgUrl: '/images/shop/sam.jpeg',
  //   sales: 2000,
  //   expressLimit: 20,
  //   expressPress: 5,
  //   slogan: '联合利华洗护满10减5'
  // })

  // // 模拟获取商店列表：查询商店列表
  // const shopList = await Shop.find().sort({ _id: -1 })
  // console.log(shopList)

  // // 模拟获取单个商店信息：根据 id 查询单个商店信息
  // const id = '631a97075f29ae0811d0a417'
  // const shop = await Shop.findById(id)
  // console.log(shop)
})()