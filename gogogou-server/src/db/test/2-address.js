/**
 * @description 模拟地址数据操作
 */

const Address = require('../../models/Address')

!(async () => {
  // // 模拟新建收货地址：创建一个新的收货地址
  // await Address.create({
  //   username: 'zhangsan', // 用 username 与用户数据关联起来
  //   city: '北京市',
  //   department: 'xxx小区',
  //   houseNumber: '门牌号1',
  //   name: '张三',
  //   phone: '12345678900'
  // })

  // // 模拟获取收货地址列表：查询某用户的所有收货地址
  // const addressList = await Address.find({ username: 'zhangsan' }).sort({ updatedAt: -1 })
  // console.log(addressList)

  // // 模拟获取单个收获地址：根据地址 id 查询单个收货地址
  // const id = '6319a0188a816d554b4f8a8d'
  // const address = await Address.findById(id)
  // console.log(address)

  // // 模拟更新编辑收货地址：查询单个收货地址并更新
  // const id = '6319a0d0b1d2576ddea4d1d1'
  // const newData = {
  //   username: 'zhangsan',
  //   city: '北京市',
  //   department: 'zzz小区',
  //   houseNumber: '门牌号3',
  //   name: '张三',
  //   phone: '12345678900'
  // }
  // const address = await Address.findOneAndUpdate(
  //   // 第一个参数，查询条件
  //   {
  //     _id: id,
  //     username: 'zhangsan'  // 安全起见，确保查询出来的结果没有出错
  //   },
  //   // 第二个参数，更新内容
  //   newData,
  //   // 第三个参数，更新配置
  //   {
  //     new: true // 返回结果为更新后。（默认值为 false，更新结果为返回前）
  //   }
  // )
  // console.log(address)
})()