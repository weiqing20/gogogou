/**
 * @description mongoose 连接数据库
 */

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017' //本地默认 mongodb 服务地址
const dbName = 'gogogouDB'

mongoose.connect(`${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接对象
const db = mongoose.connection

db.on('error', err => {
  console.log('mongoose connect error', err)
})

// //  测试数据库是否连接成功
// db.once('open', () => {
//   console.log('mongoose 连接成功')
// })

module.exports = mongoose