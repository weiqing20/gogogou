/**
 * @description Order Model
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  shopId: String,
  shopName: String,
  isCancled: {
    type: Boolean,
    default: false
  },
  address: {
    username: String,
    city: String,
    department: String,
    houseNumber: String,
    name: String,
    phone: String
  },
  products: [
    {
      product: {
        shopId: {
          type: String,
          require: true
        },
        name: String,
        imgUrl: String,
        sales: Number,
        oldPrice: Number,
        price: Number,
        tabs: [String]
      },
      orderSales: Number
    }
  ]
}, { timestamps: true })

const Order = mongoose.model('order', Schema)

module.exports = Order