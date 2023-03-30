<template>
  <div class="order" v-if="shopName">
    <div class="order__title">{{ shopName }}</div>
    <div class="order__product" v-for="item in products" :key="item._id">
      <img class="order__product__img" :src="item.imgUrl" />
      <div class="order__product__content">
        <div class="order__product__title">{{ item.name }}</div>
        <div class="order__product__yen">
          <span>&yen; </span>{{ item.price }} × {{ item.count }}
        </div>
        <div class="order__product__price">
          <span>&yen; </span>{{ (item.price * item.count).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/commonCartEffects";
export default {
  // 该组件为确认订单页中的订单信息栏
  name: "Order",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { products, shopName } = useCommonCartEffect(shopId);
    return { products, shopName };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.order {
  margin: 0.16rem 0.18rem 0.66rem 0.18rem;
  padding: 0.16rem;
  background: $bgColor;
  border-radius: 0.04rem;
  &__title {
    font-size: 0.16rem;
    color: $content-fontColor;
    line-height: 0.22rem;
  }
  &__product {
    margin-top: 0.16rem;
    display: flex;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__content {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    &__title {
      font-size: 0.14rem;
      color: $content-fontColor;
      line-height: 0.2rem;
      @include ellipsis;
      margin-bottom: 0.06rem;
    }
    &__yen {
      font-size: 0.14rem;
      color: $highlight-fontColor;
      line-height: 0.2rem;
      span {
        font-size: 0.12rem;
      }
    }
    &__price {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 0.14rem;
      color: $bgColor2;
      text-align: right;
      line-height: 0.2rem;
      span {
        font-size: 0.12rem;
      }
    }
  }
}
</style>