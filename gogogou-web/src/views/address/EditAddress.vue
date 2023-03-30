<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__back iconfont" @click="handleBackClick">&#xe681;</div>
      <span class="top__title">编辑收货地址</span>
      <div class="top__create">保存</div>
    </div>
    <div class="address">
      <div class="address__info">
        <div class="address__info__title">所在城市：</div>
        <input class="address__info__content" />
      </div>
      <div class="address__info">
        <div class="address__info__title">小区/大厦/学校：</div>
        <input class="address__info__content" />
      </div>
      <div class="address__info">
        <div class="address__info__title">楼号-门牌号：</div>
        <input class="address__info__content" />
      </div>
      <div class="address__info">
        <div class="address__info__title">收货人：</div>
        <input class="address__info__content" />
      </div>
      <div class="address__info">
        <div class="address__info__title">联系电话：</div>
        <input class="address__info__content" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

// 与 点击跳转 相关的操作
const useSkippingEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  // 该组件为编辑收货地址页
  name: "EditAddress",
  setup() {
    const { handleBackClick } = useSkippingEffect();
    return { handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $content-bgColor;
}
.top {
  line-height: 0.44rem;
  background: $bgColor;
  text-align: center;
  padding: 0 0.18rem;
  &__back {
    float: left;
    color: $search-fontColor;
    font-size: 0.16rem;
  }
  &__title {
    font-size: 0.16rem;
    color: $content-fontColor;
  }
  &__create {
    float: right;
    font-size: 0.14rem;
    color: $content-fontColor;
  }
}
.address {
  margin-top: 0.12rem;
  height: 2.24rem;
  background: $bgColor;
  padding: 0 0.18rem;
  &__info {
    height: 0.44rem;
    display: flex;
    border-bottom: $content-bgColor 0.01rem solid;
    &__title {
      float: left;
      font-size: 0.14rem;
      color: $medium-fontColor;
      margin: 0.12rem 0;
      line-height: 0.2rem;
    }
    &__content {
      flex: 1;
      font-size: 14px;
      color: $light-fontColor;
      margin: 0.12rem 0;
      padding: 0;
      border: none;
      outline: none;
    }
  }
}
</style>