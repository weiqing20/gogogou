<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__back iconfont" @click="handleBackClick">&#xe681;</div>
      <span class="top__title">我的地址</span>
      <div class="top__create" @click="handleCreateAddress">新建</div>
    </div>
    <div class="address">
      <div class="address__title">我的收货地址</div>
      <div
        class="address__item"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="address__item__name">{{ item.name }}</div>
        <div class="address__item__phone">{{ item.phone }}</div>
        <div class="address__item__text">{{ item.text }}</div>
        <div class="address__item__edit iconfont" @click="handleEditAddress">
          &#xe681;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

// 模拟接口获得的我的地址信息
const addressList = [
  {
    name: "好好（先生）",
    phone: "135797531",
    text: "北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 10层",
  },
  {
    name: "好好（先生）",
    phone: "135797531",
    text: "北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 13层",
  },
];

// 与 点击跳转 相关的操作
const useSkippingEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  const handleCreateAddress = () => {
    router.push("/address/create");
  };
  const handleEditAddress = () => {
    router.push("/address/edit");
  };
  return { handleBackClick, handleCreateAddress, handleEditAddress };
};

export default {
  // 该组件为我的地址页，管理我的地址信息
  name: "Address",
  setup() {
    const { handleBackClick, handleCreateAddress, handleEditAddress } =
      useSkippingEffect();
    return {
      addressList,
      handleBackClick,
      handleCreateAddress,
      handleEditAddress,
    };
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
  background: $search-bgColor;
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
    font-size: 16px;
    color: $content-fontColor;
  }
  &__create {
    float: right;
    font-size: 14px;
    color: $content-fontColor;
  }
}
.address {
  margin: 0.16rem 0.18rem;
  &__title {
    font-size: 14px;
    color: $content-fontColor;
    line-height: 0.2rem;
    margin-bottom: 0.12rem;
  }
  &__item {
    position: relative;
    height: 0.68rem;
    padding: 0.18rem 0.16rem;
    margin-bottom: 0.16rem;
    background: $bgColor;
    &__name {
      line-height: 0.2rem;
      font-size: 14px;
      color: $light-fontColor;
      margin-right: 0.66rem;
      float: left;
    }
    &__phone {
      line-height: 0.2rem;
      font-size: 14px;
      color: $light-fontColor;
    }
    &__text {
      margin-top: 0.08rem;
      font-size: 14px;
      color: $content-fontColor;
      width: 2.6rem;
      line-height: 0.2rem;
    }
    &__edit {
      position: absolute;
      top: 50%;
      right: 0.16rem;
      transform: translateY(-50%) rotate(180deg);
      font-size: 0.16rem;
      line-height: 0.24rem;
      color: $light-fontColor;
    }
  }
}
</style>