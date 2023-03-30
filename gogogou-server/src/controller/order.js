/**
 * @description order controller
 */

const Address = require("../models/Address")
const Order = require("../models/Order")
const Product = require("../models/Product")

/**
 * 创建订单
 * @param {string} username 用户名
 * @param {object} data 订单信息
 * @returns newOrder
 */
async function createOrder(username, data) {
  const { addressId, shopId, shopName, isCancled, products } = data
  // 获取 addressId 对应的地址信息
  const address = await Address.findById(addressId)
  // 获取 products 中所有商品的 productId
  const productIdList = products.map(p => p.productId)
  // 获取 productIdList 中 productId 对应的商品列表
  const productList = await Product.find({
    shopId,
    _id: { $in: productIdList }
  })
  // 整合订单中商品列表及其在订单中的购买量
  const productListWithOrderSales = productList.map(p => {
    // 当前遍历到的商品 id
    const pId = p._id.toString()
    const filterProduct = products.filter(i => i.productId === pId)
    if (filterProduct.length === 0) {
      throw Error('未找到匹配的购买数量')
    }
    return {
      product: p,
      orderSales: filterProduct[0].orderSales
    }
  })
  // 创建订单
  const newOrder = await Order.create({
    username,
    shopId,
    shopName,
    isCancled,
    address,
    products: productListWithOrderSales
  })
  return newOrder
}

/**
 * 获取订单列表
 * @param {string} username 
 * @returns orderList
 */
async function getOrderList(username) {
  const orderList = Order.find({ username }).sort({ updatedAt: -1 })
  return orderList
}

module.exports = { createOrder, getOrderList }