import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch {
    return {}
  }
}

export default createStore({
  state: {
    //存放购物车内店铺和商品信息
    cartList: getLocalCartList()
    // cartList:{
    //   shopId: {
    //     shopName: '',
    //     productList: {
    //       productId: {
    //         _id: '',
    //         name: '',
    //         imgUrl: '',
    //         sales: '',
    //         price: '',
    //         oldPrice: '',
    //         count: 0
    //       },
    //       等产品对象，内含该产品信息及购物数量
    //     }
    //   },
    //   等店铺对象，内涵该店铺及其产品等信息
    // }
  },
  getters: {
  },
  mutations: {
    // 更新state.cartList中店铺名字信息
    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    // 购物车信息栏 —— 加入或减出商品，并更新state.cartList中商品选中数量
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo, num } = payload
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (num > 0) { product.check = true }
      if (product.count <= 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    // 购物车信息栏 —— 改变购物车栏商品选中状态
    changeProductCheck(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },

    // 购物车信息栏 —— 从购物车栏清空商品
    clearCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },

    // 购物车信息栏 —— 改变购物车栏全选状态
    changeCartAllCheck(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (let i in products) {
          const product = products[i]
          product.check = true
        }
      }
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
