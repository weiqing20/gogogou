/**
 * @description 成功时返回的响应数据模型
 */

class SuccessModel {
  constructor(data) {
    this.errno = 0  // 成功时返回的标志
    if (data != null) {
      this.data = data
    }
  }
}

module.exports = SuccessModel

// 使用时：
// new SuccessModel() // { errno: 0 }
// new SuccessModel({...})  // { errno: 0, data: {...} }