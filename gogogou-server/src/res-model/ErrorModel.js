/**
 * @description 失败时返回的响应数据模型
 */

class ErrorModel {
  constructor(errno = -1, message = 'error') {
    this.errno = errno
    this.message = message
  }
}

module.exports = ErrorModel

// 使用时
// new ErrorModel(1001, '注册失败')