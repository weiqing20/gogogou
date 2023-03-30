<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :key="index"
      :class="{
        docker__item: true,
        docker__item__active: index === currentIndex,
      }"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  //该组件为底部导航容器栏，有首页，购物车，订单等容器，是复用部分所以抽离为组件使用
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { icon: "&#xe61e;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe654;", text: "购物车", to: { name: "CartList" } },
      { icon: "&#xebbc;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe60b;", text: "我的", to: { name: "Mine" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.docker {
  display: flex;
  position: fixed;
  box-sizing: border-box;
  padding: 0 0.18rem;
  bottom: 0;
  left: 0;
  height: 0.49rem;
  width: 100%;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    a {
      text-decoration: none;
      color: $content-fontColor;
    }
    &__active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>