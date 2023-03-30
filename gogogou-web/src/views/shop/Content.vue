<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': item.tab === currentTab,
        }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item._id">
        <img :src="item.imgUrl" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
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
                changeCartItem(shopId, item._id, item, -1, shopName);
              }
            "
            >&#xe780;</span
          >
          <span class="product__number__text">{{
            getCartProductCount(shopId, item._id)
          }}</span>
          <span
            class="product__number__plus iconfont"
            @click="
              () => {
                changeCartItem(shopId, item._id, item, 1, shopName);
              }
            "
            >&#xe845;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { get } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/commonCartEffects";

// 左侧分类栏内用到的数据
const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "fruit" },
];

// 与 左侧分类栏中选择分类 相关的操作
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};

// 与 更新该类的商品内容动态展示 相关的操作
const useContentListEffect = (currentTab, shopId) => {
  const item = reactive({ contentList: [] });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      item.contentList = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { contentList } = toRefs(item);
  return { contentList };
};

// 与 商店页面底部的购物车信息 相关的操作
const useCartEffect = () => {
  const store = useStore();
  const { cartList, changeCartItemInfo } = useCommonCartEffect();
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num);
    changeShopName(shopId, shopName);
  };
  const getCartProductCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0;
  };
  return { cartList, changeCartItem, getCartProductCount };
};

export default {
  // 该组件为 商店页面中部的分类与商品信息
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { contentList } = useContentListEffect(currentTab, shopId);
    const { cartList, changeCartItem, getCartProductCount } = useCartEffect();
    return {
      shopId,
      cartList,
      changeCartItem,
      getCartProductCount,
      categories,
      currentTab,
      handleTabClick,
      contentList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  width: 0.76rem;
  height: 100%;
  background: #f5f5f5;
  border-radius: 0.02rem;
  &__item {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    color: #333333;
    text-align: center;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    padding: 0.12rem 0;
    margin: 0 0.18rem 0 0.16rem;
    display: flex;
    border-bottom: 0.01rem solid $content-bgColor;
    position: relative;
    &__img {
      height: 0.68rem;
      width: 0.68rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontColor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: $content-fontColor;
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
      bottom: 0.12rem;
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
</style>