<template>
  <div class="wrapper">
    <div class="header">我的购物车 ( {{ AnalogInterfaceData.length }} )</div>
    <div class="orders">
      <div
        class="order"
        v-for="(item, index) in AnalogInterfaceData"
        :key="index"
      >
        <div class="order__title">{{ item.shopName }}</div>
        <div
          class="order__product"
          v-for="(innerItem, innerIndex) in item.productList"
          :key="innerIndex"
        >
          <img class="order__product__img" :src="innerItem.imgUrl" />
          <div class="order__product__content">
            <div class="order__product__title">{{ innerItem.name }}</div>
            <div class="order__product__yen">
              <span>&yen; </span>{{ innerItem.price }} × {{ innerItem.count }}
            </div>
            <div class="order__product__price">
              <span>&yen; </span
              >{{ (innerItem.price * innerItem.count).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Docker :currentIndex="1" />
</template>

<script>
import Docker from "../../components/Docker.vue";

// 模拟从接口获取的数据
const AnalogInterfaceData = [
  {
    shopName: "沃尔玛",
    productList: [
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
        name: "番茄 250g/份",
        count: "1",
        price: "33.6",
      },
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/cherry.png",
        name: "车厘子 500g/份",
        count: "1",
        price: "99.6",
      },
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/orange.png",
        name: "橙子 500g/份",
        count: "1",
        price: "12.6",
      },
    ],
  },
  {
    shopName: "京东7Fresh",
    productList: [
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/cherry.png",
        name: "车厘子 500g/份",
        count: "2",
        price: "99.6",
      },
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/crab.png",
        name: "帝王蟹 250g/份",
        count: "2",
        price: "199.9",
      },
    ],
  },
  {
    shopName: "百果园",
    productList: [
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
        name: "番茄 250g/份",
        count: "3",
        price: "33.6",
      },
      {
        imgUrl: "http://www.dell-lee.com/imgs/vue3/orange.png",
        name: "橙子 500g/份",
        count: "2",
        price: "12.6",
      },
    ],
  },
];

export default {
  // 购物车页，对应docker里的“购物车”
  name: "CartList",
  components: { Docker },
  setup() {
    return { AnalogInterfaceData };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  padding: 0 0.18rem 0 0.18rem;
  bottom: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
  background: $search-bgColor;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.16rem;
  color: $content-fontColor;
  background: $bgColor;
}
.orders {
  margin-top: 0.6rem;
}
.order {
  margin-bottom: 0.16rem;
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
