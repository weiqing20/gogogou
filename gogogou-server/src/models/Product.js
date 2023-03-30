/**
 * @description Product Model
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  shopId: {
    type: String,
    require: true
  },
  name: String,
  imgUrl: String,
  sales: Number,
  oldPrice: Number,
  price: Number,
  tabs: [String]  // 示例：['all','seckill']
}, { timestamps: true })

const Product = mongoose.model('product', Schema)

module.exports = Product