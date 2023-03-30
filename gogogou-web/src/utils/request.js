import axios from "axios";

// 创建axios实例，设置公共的局部的基础配置，使用时用该实例发送请求会携带基础配置
const instance = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  baseURL: 'http://localhost:3000',
  withCredentials: true,  // 允许跨域传递 cookie （登录）
  timeout: 10000
})

// 导出post请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      response => { resolve(response.data) },
      err => { reject(err) }
    )
  })
}

// 导出get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      response => { resolve(response.data) },
      err => { reject(err) }
    )
  })
}