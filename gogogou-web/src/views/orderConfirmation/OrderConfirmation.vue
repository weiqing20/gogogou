<template>
  <div class="wrapper">
    <TopArea />
    <Order />
    <Submit />
  </div>
</template>

<script>
import TopArea from "./TopArea.vue";
import Order from "./Order.vue";
import Submit from "./Submit.vue";
export default {
  // 该组件为确认订单页
  name: "OrderConfirmation",
  components: { TopArea, Order, Submit },
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
  background: $search-bgColor;
  overflow-y: scroll;
}
</style>