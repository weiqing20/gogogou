<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register__button" @click="handleRegister">注册</div>
    <div class="wrapper__register__link" @click="turnToLogin">
      已有账号去登陆
    </div>
    <Toast v-if="toastShow" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 与 注册 相关的操作
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
    ensurement: "",
  });
  const handleRegister = async () => {
    try {
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, ensurement, handleRegister };
};

// 与 跳转登录 相关的操作
const useLoginEffect = () => {
  const router = useRouter();
  const turnToLogin = () => {
    router.push({ name: "Login" });
  };
  return { turnToLogin };
};

export default {
  // 该组件为注册页面
  name: "Register",
  components: { Toast },
  setup() {
    const { toastShow, toastMessage, showToast } = useToastEffect();
    const { username, password, ensurement, handleRegister } =
      useRegisterEffect(showToast);
    const { turnToLogin } = useLoginEffect();
    return {
      toastShow,
      toastMessage,
      username,
      password,
      ensurement,
      handleRegister,
      turnToLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    height: 0.66rem;
    width: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    height: 0.48rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      margin-top: 0.14rem;
      line-height: 0.2rem;
      width: 100%;
      outline: none;
      border: none;
      background: none;
      font-size: 0.16rem;
      color: $content-noticeColor;
      &::placeholder {
        color: $content-noticeColor;
      }
    }
  }
  &__register__button {
    margin: 0.16rem 0.4rem;
    height: 0.48rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    font-size: 0.16rem;
    color: $bgColor;
    text-align: center;
  }
  &__register__link {
    font-size: 0.14rem;
    color: $content-noticeColor;
    text-align: center;
  }
}
</style>