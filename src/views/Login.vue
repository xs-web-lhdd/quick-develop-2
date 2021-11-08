<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>

    <van-form ref="loginForm" @submit="onSubmit">
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
          :rules="[
            { required: true, message: '请输入密码' }
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

    <div class="register" @click="changeRegister">没有账号？去注册</div>
    <div class="otherLogin">其他方式登录</div>
    <!-- gitee登录 -->
    <div class="gitee">
      <a
        href="https://gitee.com/oauth/authorize?client_id=e21ada1875792c7df538e290dc403e377289ccfa94343a4aed715cd7f9297ee2&redirect_uri=http://www.codeman.ink:8848/login&response_type=code"
      >
        <div class="otherLoginItem">
          <img class="img" src="../assets/img/gitee.svg" alt="">
        </div>
      </a>
    </div>
  </div>
</template>

<script>

import { reactive, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  setup () {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const store = useStore()
    const loginForm = reactive({
      userName: '',
      passWord: ''
    })
    const { userName, passWord } = toRefs(loginForm)

    const changeRegister = () => {
      router.push('/register')
    }
    // 提交时进行校验：
    const onSubmit = () => {
      proxy.$refs.loginForm.validate().then(async () => {
        console.log(111)
        const { code, data } = await proxy.$api.login({ ...loginForm })
        if (code === 200) {
          console.log('登录成功')
          // 数据进行保存
          store.commit('saveUserInfo', data)
          proxy.$storage.setItem('isLogin', true)
          router.push('/')
        } else {
          console.log('登陆失败')
        }
      })
    }
    return {
      userName,
      passWord,
      changeRegister,
      onSubmit
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
.register{
  width: 1.5rem;
  margin: 0 auto;
  text-align: center;
  color: #909090;
}
.otherLogin{
  position: absolute;
  top: 4rem;
  left: 1.5rem;
  color: #909090;
}
.gitee{
  position: absolute;
  top: 4.4rem;
  .otherLoginItem{
    width: 1rem;
    text-align: center;
    margin: 0 1.32rem;
  }
  .img{
    width: .5rem;
  }
}
</style>
