<template>
  <div class="not__img">
    <img src="../assets/img/404.jpg" alt="">
  </div>
  <div class="not__btn" @click="backHome">返回首页</div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const backHome = () => {
      router.push('/')
    }
    return { backHome }
  }
}
</script>

<style lang="scss" scoped>
.not{
  &__img{
    img{
      width: 100%;
    }
  }
  &__btn{
    position: absolute;
    top: 3.825rem;
    left: 1.12rem;
    background-color: #fff;
    width: 1.54rem;
    height: .34rem;
    border-radius: .2rem;
    text-align: center;
    line-height: .34rem;
    font-size: .16rem;
    color: cornflowerblue;
    font-weight: 600;
    letter-spacing: .02rem;
  }
}
</style>
