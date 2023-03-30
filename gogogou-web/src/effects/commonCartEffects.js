import { computed } from "vue";
import { useStore } from "vuex";

// 与 选中商品 相关的操作
export const useCommonCartEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList;

  // 计算 在该店铺选中商品的总件数和总价，判断 购物车栏商品列表是否为全部选中
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList;
    let result = { total: 0, price: 0, isAllCheck: true };
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        result.total += product.count;
        if (product.check) {
          result.price += product.count * product.price;
        }
        if (product.count > 0 && !product.check) {
          result.isAllCheck = false;
        }
      }
    }
    result.price = result.price.toFixed(2);
    return result;
  });

  // 导出该店铺的商品列表
  const products = computed(() => {
    const productList = cartList[shopId]?.productList || {};
    const notEmptyProducts = {};
    for (let i in productList) {
      const product = productList[i];
      if (product.count > 0) {
        notEmptyProducts[i] = product
      }
    }
    return notEmptyProducts;
  });

  // 导出该店铺的店铺名
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || '';
    return shopName;
  });

  // 修改商品列表中某商品加入购物车的数量
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartItemInfo", { shopId, productId, productInfo, num });
  };

  return { cartList, products, shopName, calculations, changeCartItemInfo };
};