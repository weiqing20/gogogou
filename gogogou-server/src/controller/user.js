/**
 * @description user controller
 */

const User = require('../models/User')

/**
 * 注册新用户
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns newUser
 */
async function register(username, password) {
  // 保存到数据库
  const newUser = await User.create({ username, password })
  return newUser
}

/**
 * 用户登录
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns 成功 true / 失败 false
 */
async function login(username, password) {
  // 根据条件查询单个用户
  const result = await User.findOne({ username, password })
  if (result != null) {
    return true
  } else {
    return false
  }
}

module.exports = { register, login }