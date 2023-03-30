/**
 * @description shop controller
 */

const Product = require('../models/Product')
const Shop = require('../models/Shop')

/**
 * 获取商店列表
 * @returns shopList
 */
async function getShopList() {
  const shopList = await Shop.find().sort({ _id: -1 })
  return shopList
}

/**
 * 获取单个商店信息
 * @param {string} id 商店 id
 * @returns shop
 */
async function getShopById(id) {
  const shop = await Shop.findById(id)
  return shop
}

/**
 * 获取单个商店的商品列表
 * @param {string} shopId 商店 id
 * @param {string} tab 标签 tab
 * @returns products
 */
async function getProducts(shopId, tab) {
  const products = Product.find({
    shopId,
    tabs: {
      $in: tab
    }
  })
  return products
}

module.exports = { getShopList, getShopById, getProducts }