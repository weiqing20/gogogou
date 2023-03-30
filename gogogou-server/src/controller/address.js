/**
 * @description address controller
 */

const Address = require('../models/Address')

/**
 * 创建收货地址
 * @param {string} username 用户名
 * @param {object} data 收货地址详细信息
 * @returns newAddress
 */
async function createAddress(username, data) {
  const newAddress = Address.create({
    username,
    ...data
  })
  return newAddress
}

/**
 * 获取收货地址列表
 * @param {string} username 
 * @returns addressList
 */
async function getAddressList(username) {
  const addressList = await Address.find({ username }).sort({ updatedAt: -1 })
  return addressList
}

/**
 * 获取单个收货地址
 * @param {string} id 收货地址 id
 * @returns address
 */
async function getAddressById(id) {
  const address = await Address.findById(id)
  return address
}


async function updateAddress(id, username, data) {
  const newAddress = Address.findOneAndUpdate(
    { _id: id, username },
    { username, ...data },
    { new: true }
  )
  return newAddress
}

module.exports = { createAddress, getAddressList, getAddressById, updateAddress }