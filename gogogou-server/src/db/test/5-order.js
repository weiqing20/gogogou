/**
 * @description 模拟订单数据操作
 */

const Order = require('../../models/Order')
const Address = require('../../models/Address')
const Product = require('../../models/Product')

!(async () => {
  // // 模拟前端传来的 request 请求信息
  // const requestBody = {
  //   addressId: '6319a0188a816d554b4f8a8d',
  //   shopId: '631a97075f29ae0811d0a417',
  //   shopName: '沃尔玛',
  //   isCancled: false, // 是否取消订单
  //   products: [
  //     {
  //       productId: '631aa467826cc7f008402854',
  //       orderSales: 3  // 购买数量
  //     },
  //     {
  //       productId: '631aa467826cc7f008402856',
  //       orderSales: 5  // 购买数量
  //     }
  //   ]
  // }

  // // 获取订单地址信息
  // const address = await Address.findById(requestBody.addressId)

  // // 获取订单商品列表
  // const productIdList = requestBody.products.map(p => p.productId)
  // const productList = await Product.find({
  //   shopId: requestBody.shopId,
  //   _id: {
  //     $in: productIdList  // 确保 _id 在 productIdList 指定的范围内
  //   }
  // })

  // // 整合订单商品列表和在订单内购买量
  // const productListWithOrderSales = productList.map(p => {
  //   // 获取当前遍历到的商品的 id
  //   const pId = p._id.toString()
  //   // 筛选出当前遍历到的商品在请求中对应的 product 项
  //   const filterProduct = requestBody.products.filter(item => item.productId === pId)
  //   if (filterProduct.length === 0) {
  //     throw Error('未找到匹配的购买数量')
  //   }
  //   return {
  //     product: p,
  //     orderSales: filterProduct[0].orderSales
  //   }
  // })

  // // 模拟创建订单
  // await Order.create({
  //   username: 'zhangsan',
  //   shopId: requestBody.shopId,
  //   shopName: requestBody.shopName,
  //   isCancled: requestBody.isCancled,
  //   address,
  //   products: productListWithOrderSales
  // })
})()