<template>
  <div class="wrapper">
    <div class="top">
      <div class="mine">
        <img class="mine__photo" src="../../images/mine.png" />
        <div class="mine__info">
          <div class="mine__info__edit iconfont">&#xe6f5;</div>
          <div class="mine__info__name">{{ userInfo.username }}</div>
          <div class="mine__info__id">ID:{{ userInfo._id }}</div>
        </div>
        <div class="mine__assets">
          <div class="mine__assets__item">
            <div class="mine__assets__title">红包</div>
            <div class="mine__assets__count">218</div>
          </div>
          <div class="mine__assets__item">
            <div class="mine__assets__title">优惠券</div>
            <div class="mine__assets__count">12</div>
          </div>
          <div class="mine__assets__item">
            <div class="mine__assets__title">鲜豆</div>
            <div class="mine__assets__count">88</div>
          </div>
          <div class="mine__assets__item">
            <div class="mine__assets__title">白条</div>
            <div class="mine__assets__count">1000</div>
          </div>
        </div>
      </div>
    </div>
    <div class="support"></div>
    <div class="content">
      <div class="content__item">
        <div class="content__item__icon content__item__icon1 iconfont">
          &#xe7d1;
        </div>
        <div class="content__item__text">我的钱包</div>
        <div class="content__item__enter iconfont">&#xe681;</div>
      </div>
      <div class="content__item" @click="trunToAddress">
        <div class="content__item__icon content__item__icon2 iconfont">
          &#xe66b;
        </div>
        <div class="content__item__text">我的地址</div>
        <div class="content__item__enter iconfont">&#xe681;</div>
      </div>
      <div class="content__item">
        <div class="content__item__icon content__item__icon3 iconfont">
          &#xe67e;
        </div>
        <div class="content__item__text">客服与帮助</div>
        <div class="content__item__enter iconfont">&#xe681;</div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { get } from "../../utils/request";
import Docker from "../../components/Docker.vue";

// 与我的页面中的内容区域里的 跳转 相关的操作
const useContentSkippingEffect = () => {
  const router = useRouter();
  const trunToAddress = () => {
    router.push("/address/address");
  };
  return { trunToAddress };
};

// 与我的页面中的 信息展示 相关的操作
const useUserEffect = () => {
  const userInfo = reactive({ _id: "", username: "" });
  const getUserInfo = async () => {
    const result = await get("/api/user/info");
    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data;
      userInfo._id = _id || "";
      userInfo.username = username || "";
    }
  };
  getUserInfo();
  return userInfo;
};

export default {
  // 我的页面，对应docker里的“我的”
  name: "Mine",
  components: { Docker },
  setup() {
    const { trunToAddress } = useContentSkippingEffect();
    const userInfo = useUserEffect();
    return { trunToAddress, userInfo };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  bottom: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
}
.top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-image: linear-gradient(240deg, #3a6ff3 0%, #50c7fb 100%);
  border-bottom-left-radius: 90% 70%;
  border-bottom-right-radius: 90% 70%;
  background-size: 100% 2.5rem;
  background-repeat: no-repeat;
}
.mine {
  position: relative;
  margin: 1rem 0.18rem 0 0.18rem;
  height: 2rem;
  background: $bgColor;
  box-shadow: 0 0.08rem 0.16rem 0 $box-shodowColor;
  border-radius: 0.08rem;
  &__photo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  &__info {
    position: absolute;
    top: 0.6rem;
    width: 100%;
    text-align: center;
    &__edit {
      position: absolute;
      top: -1.1rem;
      right: 0rem;
      margin: 0.05rem;
      font-size: 0.2rem;
      line-height: 0.2rem;
      color: $content-bgColor2;
    }
    &__name {
      font-size: 0.24rem;
      color: $content-fontColor2;
      line-height: 0.36rem;
    }
    &__id {
      height: 0.18rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-bgColor2;
    }
  }
  &__assets {
    position: absolute;
    top: 1.2rem;
    bottom: 0;
    width: 100%;
    border-top: $content-bgColor 0.01rem solid;
    display: flex;
    &__item {
      flex: 1;
      text-align: center;
    }
    &__title {
      margin: 0.12rem 0 0.03rem 0;
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: $content-bgColor2;
    }
    &__count {
      font-size: 0.2rem;
      line-height: 0.28rem;
      color: $content-fontColor2;
      text-align: center;
    }
  }
}
.support {
  height: 3rem;
}
.content {
  margin: 0.16rem 0.18rem;
  height: 1.38rem;
  background: $bgColor;
  box-shadow: 0 8px 16px 0 $box-shodowColor;
  border-radius: 8px;
  padding: 0.06rem 0.16rem;
  &__item {
    padding: 0.12rem 0;
    height: 0.22rem;
    &__icon {
      float: left;
      width: 0.22rem;
      height: 0.22rem;
      text-align: center;
      line-height: 0.22rem;
      border-radius: 8px;
      color: $bgColor;
    }
    &__icon1 {
      background: #ed4a47;
    }
    &__icon2 {
      background: #32c5ff;
    }
    &__icon3 {
      background: #a963e5;
    }
    &__text {
      float: left;
      margin-left: 0.12rem;
      line-height: 0.22rem;
      font-size: 0.15rem;
      color: $content-fontColor2;
    }
    &__enter {
      float: right;
      line-height: 0.22rem;
      color: $content-bgColor2;
      transform: scale(0.7) rotate(180deg);
    }
  }
}
</style>
