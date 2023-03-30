<template>
  <div class="top">
    <div class="top__header">
      <div class="top__header__back iconfont" @click="handleBackClick">
        &#xe681;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span>瑶妹（先生） </span>
        <span>18911024266</span>
      </div>
      <div class="top__receiver__enter iconfont" @click="turnToAddress">
        &#xe681;
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  // 该组件为确认订单页中的顶部区域，包括返回按钮，标题展示和收货地址栏
  name: "TopArea",
  setup() {
    const router = useRouter();
    const handleBackClick = () => {
      router.back();
    };
    const turnToAddress = () => {
      router.push("/address/address");
    };
    return { handleBackClick, turnToAddress };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.top {
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  &__header {
    position: relative;
    padding: 0.22rem 0.18rem 0.21rem 0.18rem;
    line-height: 0.24rem;
    font-size: 0.16rem;
    color: $bgColor;
    text-align: center;
    &__back {
      position: absolute;
      font-size: 0.2rem;
    }
  }
  &__receiver {
    position: relative;
    box-sizing: border-box;
    margin: 0 0.18rem;
    background: $bgColor;
    border-radius: 0.04rem;
    height: 1.11rem;
    padding: 0.16rem;
    &__title {
      font-size: 0.16rem;
      color: $content-fontColor;
      line-height: 0.22rem;
      padding-bottom: 0.14rem;
    }
    &__address {
      font-size: 0.14rem;
      color: $content-fontColor;
      line-height: 0.2rem;
    }
    &__info {
      padding-top: 0.06rem;
      span {
        display: inline-block;
        line-height: 0.17rem;
        margin-right: 0.06rem;
        font-size: 0.12rem;
        color: $medium-fontColor;
      }
    }
    &__enter {
      width: 0.32rem;
      height: 0.41rem;
      text-align: center;
      line-height: 0.4rem;
      position: absolute;
      top: 0.35rem;
      right: 0.06rem;
      font-size: 0.16rem;
      transform: rotate(180deg);
    }
  }
}
</style>