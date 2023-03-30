/**
 * @description 模拟商品数据操作
 */

const Product = require('../../models/Product')

!(async () => {
  // // 获取某个商店的商品列表前，需给某个商店创建几个商品
  // // 给第一个商店添加商品
  // await Product.create({
  //   shopId: '631a97075f29ae0811d0a417',  // 用 shopId 与商店数据关联起来
  //   name: '苹果',
  //   imgUrl: '/images/product/apple.jpg',
  //   sales: 200,
  //   oldPrice: 27,
  //   price: 25,
  //   tabs: ['all', 'fruit']
  // })
  // await Product.create({
  //   shopId: '631a97075f29ae0811d0a417',
  //   name: '葡萄',
  //   imgUrl: '/images/product/grape.jpg',
  //   sales: 100,
  //   oldPrice: 36,
  //   price: 25,
  //   tabs: ['all', 'seckill', 'fruit']
  // })
  // await Product.create({
  //   shopId: '631a97075f29ae0811d0a417',
  //   name: '桃子',
  //   imgUrl: '/images/product/peach.jpg',
  //   sales: 50,
  //   oldPrice: 19,
  //   price: 16,
  //   tabs: ['all', 'fruit']
  // })
  // await Product.create({
  //   shopId: '631a97075f29ae0811d0a417',
  //   name: '西瓜',
  //   imgUrl: '/images/product/watermelon.jpg',
  //   sales: 180,
  //   oldPrice: 16,
  //   price: 10,
  //   tabs: ['all', 'seckill', 'fruit']
  // })
  // // 给第二个商店添加商品
  // await Product.create({
  //   shopId: '631a97085f29ae0811d0a41a',  // 用 shopId 与商店数据关联起来
  //   name: '苹果',
  //   imgUrl: '/images/product/apple.jpg',
  //   sales: 200,
  //   oldPrice: 27,
  //   price: 25,
  //   tabs: ['all', 'fruit']
  // })
  // await Product.create({
  //   shopId: '631a97085f29ae0811d0a41a',
  //   name: '葡萄',
  //   imgUrl: '/images/product/grape.jpg',
  //   sales: 100,
  //   oldPrice: 36,
  //   price: 25,
  //   tabs: ['all', 'seckill', 'fruit']
  // })

  // // 模拟获取单个商店的商品列表：根据 id 和 tab 查询单个商店单个标签的商品列表
  // const productList = await Product.find({
  //   shopId: '631a97075f29ae0811d0a417',
  //   tabs: {
  //     $in: 'seckill'
  //   }
  // })
  // console.log(productList)
})()