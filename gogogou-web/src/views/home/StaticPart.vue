<template>
  <div class="position">
    <span class="iconfont icon-position">&#xe648;</span>
    <span>北京理工大学国防科技园2号楼10层</span>
    <span class="iconfont icon-notice">&#xe811;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe618;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.imgName">
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  // 该组件为首页上部分静态或暂写为静态的内容，有地址栏，搜索框，导航项等内容
  name: "StaticPart",
  setup() {
    const iconsList = [
      { imgName: "超市", desc: "超市便利" },
      { imgName: "菜市场", desc: "菜市场" },
      { imgName: "水果店", desc: "水果店" },
      { imgName: "鲜花", desc: "鲜花绿植" },
      { imgName: "医药健康", desc: "医药健康" },
      { imgName: "家居", desc: "家居时尚" },
      { imgName: "蛋糕", desc: "烘培蛋糕" },
      { imgName: "签到", desc: "签到" },
      { imgName: "大牌免运", desc: "大牌免运" },
      { imgName: "红包", desc: "红包套餐" },
    ];
    return { iconsList };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variables.scss";

.position {
  position: relative;
  padding: 0.16rem 0.28rem 0.16rem 0;
  height: 0.22rem;
  font-size: 0.16rem;
  line-height: 0.22rem;
  @include ellipsis;
  .icon-position {
    position: relative;
    top: 0.01rem;
    margin-right: 0.08rem;
    font-size: 0.2rem;
  }
  .icon-notice {
    position: absolute;
    top: 0.17rem;
    right: 0;
    font-size: 0.2rem;
  }
}
.search {
  height: 0.32rem;
  background: $search-bgColor;
  border-radius: 0.16rem;
  color: $search-fontColor;
  margin-bottom: 0.12rem;
  .iconfont {
    font-size: 0.16rem;
    padding: 0 0.05rem 0 0.1rem;
  }
  &__text {
    line-height: 0.32rem;
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 0.87rem;
  &__img {
    width: 100%;
  }
}
.icons {
  margin-top: 0.16rem;
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      text-align: center;
      margin: 0.06rem 0 0.16rem 0;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>
