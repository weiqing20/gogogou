<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";

// 与 附近店铺栏中的展示内容 相关的操作
const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("api/shop/hot-list");
    if (result?.errno === 0 && result?.data.length) {
      nearbyList.value = result.data;
    }
  };
  return { nearbyList, getNearbyList };
};

export default {
  // 该组件为附近店铺栏，用于展示附近店铺的商店信息项，使用了商店信息项的组件
  name: "Nearby",
  components: { ShopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearbyList, getNearbyList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variables.scss";

.nearby {
  &__title {
    font-size: 0.18rem;
    margin: 0.16rem 0 0.02rem 0;
    font-weight: normal;
  }
  &__item {
    display: flex;
    padding-top: 0.12rem;
    &__img {
      height: 0.56rem;
      width: 0.56rem;
      margin-right: 0.16rem;
    }
    .nearby__content {
      flex: 1;
      padding-bottom: 0.12rem;
      border-bottom: 0.01rem solid $content-bgColor;
      &__title {
        font-size: 0.16rem;
        line-height: 0.22rem;
      }
      &__tags {
        line-height: 0.18rem;
        font-size: 0.13rem;
        margin: 0.08rem 0;
      }
      &__tag {
        margin-right: 0.16rem;
      }
      &__highlight {
        color: $highlight-fontColor;
        line-height: 0.18rem;
        font-size: 0.13rem;
      }
    }
  }
  a {
    text-decoration: none;
    color: #333;
  }
}
</style>
