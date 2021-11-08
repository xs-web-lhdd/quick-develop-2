<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>

    <van-form ref="registerForm" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userName"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="passWord"
          type="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="phoneNumber"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
          ]"
        />
        <van-field
          v-model="email"
          placeholder="请输入邮箱"
          :rules="[
            { required: true, message: '请填写邮箱' },
            { pattern: /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/, message: '邮箱格式有误！'}
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="login" @click="changeLogin">已有账号？去登录</div>
  </div>
</template>

<script>

import { reactive, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const registerForm = reactive({
      userName: '',
      passWord: '',
      email: '',
      phoneNumber: ''
    })
    const { userName, passWord, phoneNumber, email } = toRefs(registerForm)

    // 提交时进行校验：
    const onSubmit = () => {
      proxy.$refs.registerForm.validate().then(async () => {
        const { code, msg } = await proxy.$api.register({ ...registerForm })
        if (code === 200) {
          alert('注册成功')
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        } else {
          console.log(msg)
        }
      })
    }
    const changeLogin = () => {
      router.push('/login')
    }
    return {
      userName,
      passWord,
      phoneNumber,
      email,
      onSubmit,
      changeLogin
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
}
.login{
  width: 1.5rem;
  margin: 0 auto;
  text-align: center;
  color: #909090;
}
</style>
