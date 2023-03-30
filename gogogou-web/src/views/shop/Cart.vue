<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="changeShowCart"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => changeCartAllCheck(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.isAllCheck ? '&#xe61a;' : '&#xe619;'"
          ></span>
          <span class="product__header__text">全选</span>
        </div>
        <div class="product__header__clear">
          <span @click="() => clearCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <div class="product__item" v-for="item in products" :key="item._id">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe61a;' : '&#xe619;'"
          @click="() => changeProductCheck(shopId, item._id)"
        ></div>
        <img :src="item.imgUrl" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <div class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </div>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, -1);
              }
            "
            >&#xe780;</span
          >
          <span class="product__number__text">{{ item.count || 0 }}</span>
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItemInfo(shopId, item._id, item, 1);
              }
            "
            >&#xe845;</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon" @click="changeShowCart">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
        />
        <div class="check__icon__tag">
          {{ calculations.total > 99 ? "99+" : calculations.total }}
        </div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price"
          >&yen; {{ calculations.price }}</span
        >
      </div>
      <div class="check__btn" @click="trunToOrder">去结算</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useCommonCartEffect } from "../../effects/commonCartEffects";

// 与 商店页面底部的购物信息栏 相关的操作
const useCartEffect = (shopId) => {
  const store = useStore();
  const router = useRouter();
  const { products, calculations, changeCartItemInfo } =
    useCommonCartEffect(shopId);
  const showCart = ref(false);

  // 改变 购物车栏的展示状态
  const changeShowCart = () => {
    showCart.value = !showCart.value;
  };

  // 改变 购物车栏中的 商品选中状态
  const changeProductCheck = (shopId, productId) => {
    store.commit("changeProductCheck", { shopId, productId });
  };

  // 购物车栏中的 清空购物车功能
  const clearCartProducts = (shopId) => {
    store.commit("clearCartProducts", { shopId });
    showCart.value = !showCart.value;
  };

  // 购物车栏中的 全选功能
  const changeCartAllCheck = (shopId) => {
    store.commit("changeCartAllCheck", { shopId });
  };

  // 商店页面底部的购物信息栏中 去结算 点击跳转到 确认订单页
  const trunToOrder = () => {
    if (calculations.value.total > 0) {
      router.push(`/orderConfirmation/${shopId}`);
    }
  };

  return {
    showCart,
    products,
    calculations,
    changeShowCart,
    changeCartItemInfo,
    changeProductCheck,
    clearCartProducts,
    changeCartAllCheck,
    trunToOrder,
  };
};

export default {
  // 该组件为商店页面底部的购物信息栏，有可弹出购物车栏和底部信息栏
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {
      showCart,
      products,
      calculations,
      changeShowCart,
      changeCartItemInfo,
      changeProductCheck,
      clearCartProducts,
      changeCartAllCheck,
      trunToOrder,
    } = useCartEffect(shopId);
    return {
      shopId,
      showCart,
      products,
      calculations,
      changeShowCart,
      changeCartItemInfo,
      changeProductCheck,
      clearCartProducts,
      changeCartAllCheck,
      trunToOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $mask-bgColor;
}
.cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgColor;
  z-index: 1;
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__header {
    display: flex;
    height: 0.52rem;
    line-height: 0.52rem;
    padding: 0 0.18rem;
    border-bottom: 0.01rem solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontColor;
    &__icon {
      font-size: 0.2rem;
      color: $btn-bgColor;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    &__text {
      vertical-align: middle;
    }
    &__clear {
      flex: 1;
      text-align: right;
    }
  }
  &__item {
    padding: 0.12rem 0;
    margin: 0 0.18rem 0 0.16rem;
    display: flex;
    border-bottom: 0.01rem solid $content-bgColor;
    position: relative;
    &__checked {
      padding: 0 0.16rem 0 0.02rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
      line-height: 0.46rem;
    }
    &__img {
      height: 0.46rem;
      width: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
      overflow: hidden;
    }
    &__title {
      margin: 0 0 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &__price {
      height: 0.2rem;
      line-height: 0.14rem;
      font-size: 0.14rem;
      color: $highlight-fontColor;
    }
    &__yen {
      display: inline-block;
      font-size: 0.2rem;
      transform: scale(0.5);
      transform-origin: left bottom;
    }
    &__origin {
      display: inline-block;
      font-size: 0.2rem;
      padding-left: 0.06rem;
      transform: scale(0.5);
      transform-origin: left bottom;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.25rem;
      &__minus {
        font-size: 0.22rem;
        line-height: 0.2rem;
        color: $medium-fontColor;
        vertical-align: middle;
      }
      &__plus {
        font-size: 0.22rem;
        line-height: 0.2rem;
        vertical-align: middle;
        color: $btn-bgColor;
      }
      &__text {
        display: inline-block;
        width: 0.3rem;
        height: 0.2rem;
        text-align: center;
        font-size: 0.14rem;
        color: $content-fontColor;
        line-height: 0.2rem;
        vertical-align: middle;
      }
    }
  }
}
.check {
  display: flex;
  background: $bgColor;
  height: 0.49rem;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  &__icon {
    position: relative;
    width: 0.76rem;
    height: 0.49rem;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.1rem auto;
    }
    &__tag {
      position: absolute;
      display: block;
      min-width: 0.2rem;
      height: 0.2rem;
      border-radius: 0.1rem;
      background: $highlight-fontColor;
      text-align: center;
      font-size: 0.16rem;
      color: $bgColor;
      line-height: 0.2rem;
      top: 0.02rem;
      left: 0.44rem;
      transform: scale(0.5);
      transform-origin: left;
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    color: $content-fontColor;
    padding-left: 0.08rem;
    line-height: 0.49rem;
    vertical-align: middle;
    &__price {
      font-size: 0.18rem;
      color: $highlight-fontColor;
      vertical-align: middle;
    }
  }
  &__btn {
    width: 0.98rem;
    text-align: center;
    line-height: 0.49rem;
    font-size: 0.14rem;
    background: $btn-bgColor2;
    color: $bgColor;
  }
}
</style>