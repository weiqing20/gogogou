<template>
  <div class="wrapper">
    <div class="header">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span
            class="order__status"
            v-html="item.isCanceled ? '已取消' : '已下单'"
          ></span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(imgItem, imgIndex) in item.products"
              :key="imgIndex"
            >
              <img class="order__content__img" :src="imgItem.product.imgUrl" />
            </template>
          </div>
          <div class="order__info">
            <div class="order__info__price">&yen;{{ item.totalPrice }}</div>
            <div class="order__info__total">共{{ item.totalNum }}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { get } from "../../utils/request";
import Docker from "../../components/Docker.vue";
import { reactive, toRefs } from "@vue/reactivity";

// 与 订单页中的订单信息栏 相关的操作
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getOrderList = async () => {
    const result = await get("/api/order");
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach((order) => {
        let totalPrice = 0;
        let totalNum = 0;
        const products = order.products || [];
        products.forEach((productItem) => {
          totalPrice +=
            productItem?.product?.price * productItem?.orderSales || 0;
          totalNum += productItem?.orderSales || 0;
        });
        order.totalPrice = totalPrice;
        order.totalNum = totalNum;
      });
      data.list = result.data;
    }
  };
  getOrderList();

  const { list } = toRefs(data);
  return { list };
};

export default {
  // 订单页，对应docker里的“订单”
  name: "OrderList",
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect();
    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  padding: 0 0.18rem 0.08rem 0.18rem;
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
  .order {
    margin-top: 0.16rem;
    background: $bgColor;
    border-radius: 0.04rem;
    height: 0.78rem;
    padding: 0.16rem;
    &__title {
      font-size: 0.16rem;
      color: $content-fontColor;
      line-height: 0.22rem;
      margin-bottom: 0.16rem;
    }
    .order__status {
      float: right;
      font-size: 0.14rem;
      color: $light-fontColor;
    }
    &__content {
      height: 0.4rem;
      display: flex;
      &__imgs {
        flex: 1;
      }
      &__img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.12rem;
      }
    }
    &__info {
      width: 0.64rem;
      &__price {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: $highlight-fontColor;
        text-align: right;
        padding-bottom: 0.06rem;
      }
      &__total {
        font-size: 0.12rem;
        color: $content-fontColor;
        text-align: right;
        line-height: 0.14rem;
      }
    }
  }
}
</style>
