<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  // 该组件为提示弹框，传递提示内容message
  name: "Toast",
  props: ["message"],
};

// 导出 例如登录或注册 出错时的提示弹框，使用组件时弹出提示内容，并搭配v-if绑定toastShow定时消失
export const useToastEffect = () => {
  const toastData = reactive({
    toastShow: false,
    toastMessage: "",
  });
  const showToast = (message) => {
    toastData.toastShow = true;
    toastData.toastMessage = message;
    setTimeout(() => {
      toastData.toastShow = false;
      toastData.toastMessage = "";
    }, 2000);
  };
  const { toastShow, toastMessage } = toRefs(toastData);
  return { toastShow, toastMessage, showToast };
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.12rem;
  font-size: 0.16rem;
  background: $mask-bgColor;
  border-radius: 0.1rem;
  color: $bgColor;
}
</style>