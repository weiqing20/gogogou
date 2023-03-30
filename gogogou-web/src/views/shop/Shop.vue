<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe681;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe618;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";

// 与 展示商店信息项 相关的操作
const useItemDataEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

// 与 返回主页 相关的操作
const useRouterBackEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  // 该组件为商店页面
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = useItemDataEffect();
    const { handleBackClick } = useRouterBackEffect();
    getItemData();
    return { item, handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.16rem 0 0.04rem 0;
  height: 0.32rem;
  &__back {
    width: 0.28rem;
    transform: translateX(-0.03rem);
    line-height: 0.32rem;
    font-size: 0.2rem;
    color: #b6b6b6;
  }
  &__content {
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    display: flex;
    &__icon {
      width: 0.44rem;
      line-height: 0.32rem;
      text-align: center;
      color: $search-fontColor;
      font-size: 0.18rem;
    }
    &__input {
      flex: 1;
      padding-right: 0.16rem;
      border: none;
      outline: none;
      background: none;
      font-size: 0.14rem;
      color: $content-fontColor;
      &::placeholder {
        font-size: 0.14rem;
        color: $content-fontColor;
      }
    }
  }
}
</style>