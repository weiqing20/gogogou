<template>
  <div class="submit">
    <div class="submit__price">
      实付金额
      <span class="submit__price__yen">&yen;{{ calculations.price }}</span>
    </div>
    <div class="submit__btn" @click="() => changeShowConfirm(true)">
      提交订单
    </div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => changeShowConfirm(false)"
  >
    <div class="mask__content" @click.stop>
      <div class="mask__content__title">确认要支付订单？</div>
      <div class="mask__content__tip">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
  <div class="skipping" v-show="showSkipping">
    <div class="skipping__icon iconfont">&#xe609;</div>
    <div class="skipping__text">{{ skippingText }}，正在跳转…</div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { post } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/commonCartEffects";
import { ref } from "@vue/reactivity";

// 与 提交栏 提交订单 相关的操作
const useSubmitOrderEffect = (
  shopId,
  shopName,
  products,
  showSkipping,
  skippingText
) => {
  const store = useStore();
  const router = useRouter();
  const handleConfirmOrder = async (isCanceled) => {
    const orderProducts = [];
    for (let i in products.value) {
      const product = products.value[i];
      orderProducts.push({ id: product._id, num: product.count });
    }
    try {
      const result = await post("/api/order", {
        addressId: 1, //这里有问题：要取到之前选中的地址的addressId，需要改一下代码
        shopId,
        shopName: shopName.value,
        isCanceled,
        products: orderProducts,
      });
      if (result?.errno === 0) {
        store.commit("clearCartProducts", { shopId });
        skippingText.value = isCanceled ? "已取消" : "支付成功";
        showSkipping.value = true;
        setTimeout(() => {
          router.push({ name: "OrderList" });
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { handleConfirmOrder };
};

// 改变 提交订单按钮的点击弹框 的展示状态
const useShowMaskEffect = () => {
  const showConfirm = ref(false);
  const showSkipping = ref(false);
  const skippingText = ref("");
  const changeShowConfirm = (state) => {
    showConfirm.value = state;
  };
  return {
    showConfirm,
    showSkipping,
    skippingText,
    changeShowConfirm,
  };
};

export default {
  // 该组件为确认订单页中的底部提交栏，也包括点击 提交订单 按钮的弹框
  name: "Submit",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { showConfirm, showSkipping, skippingText, changeShowConfirm } =
      useShowMaskEffect();
    const { calculations, shopName, products } = useCommonCartEffect(shopId);
    const { handleConfirmOrder } = useSubmitOrderEffect(
      shopId,
      shopName,
      products,
      showSkipping,
      skippingText
    );
    return {
      showConfirm,
      showSkipping,
      changeShowConfirm,
      calculations,
      handleConfirmOrder,
      skippingText,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  display: flex;
  background: $bgColor;
  &__price {
    flex: 1;
    padding-left: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontColor;
    text-align: left;
    line-height: 0.49rem;
    &__yen {
      margin-left: 0.04rem;
      font-size: 0.16rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background: $btn-bgColor2;
    text-align: center;
    line-height: 0.49rem;
    font-size: 0.14rem;
    color: $bgColor;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $mask-bgColor;
  &__content {
    position: absolute;
    width: 2.96rem;
    height: 1.56rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $bgColor;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      color: $content-fontColor;
      margin: 0.24rem 0 0.08rem 0;
      line-height: 0.24rem;
    }
    &__tip {
      font-size: 0.14rem;
      color: $medium-fontColor;
      line-height: 0.2rem;
    }
    &__btns {
      height: 0.32rem;
      padding: 0.24rem 0.44rem 0.24rem 0.44rem;
      display: flex;
    }
    &__btn {
      flex: 1;
      margin: 0 0.12rem;
      width: 0.8rem;
      font-size: 0.14rem;
      color: $btn-bgColor;
      line-height: 0.3rem;
      border: 0.01rem solid $btn-bgColor2;
      border-radius: 0.16rem;
      &--first {
        background: $bgColor;
        color: $btn-bgColor;
      }
      &--last {
        background: $btn-bgColor2;
        color: $bgColor;
      }
    }
  }
}
.skipping {
  position: fixed;
  width: 2.96rem;
  height: 1.56rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 0.08rem;
  text-align: center;
  &__icon {
    margin: 0.36rem 0 0.2rem 0;
    font-size: 0.32rem;
    line-height: 0.32rem;
    color: #333333;
  }
  &__text {
    line-height: 0.25rem;
    font-size: 18px;
    color: #333333;
  }
}
</style>