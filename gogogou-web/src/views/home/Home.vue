<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from "./StaticPart";
import Nearby from "./Nearby";
import Docker from "../../components/Docker.vue";
export default {
  // 首页，对应docker里的“首页”
  name: "Home",
  components: { StaticPart, Nearby, Docker },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  padding: 0 0.18rem 0.08rem 0.18rem;
  bottom: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
}
</style>
