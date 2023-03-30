<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl" />
    <div
      :class="{
        shop__content: true,
        'shop__content--bordered': hideBorder ? false : true,
      }"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售：{{ item.sales }}+</span>
        <span class="shop__content__tag">起送：{{ item.expressLimit }}</span>
        <span class="shop__content__tag"
          >基础运费：{{ item.expressPrice }}</span
        >
      </div>
      <div class="shop__content__highlight">{{ item.slogan }}</div>
    </div>
  </div>
</template>

<script>
export default {
  //该组件为商店信息项，在首页等用到，有商店图标，月售，起送等信息，是复用部分所以抽离为组件使用
  name: "ShopInfo",
  props: ["item", "hideBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.shop {
  display: flex;
  padding-top: 0.12rem;
  &__img {
    height: 0.56rem;
    width: 0.56rem;
    margin-right: 0.16rem;
  }
  &__content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--bordered {
      border-bottom: 0.01rem solid $content-bgColor;
    }
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
</style>
