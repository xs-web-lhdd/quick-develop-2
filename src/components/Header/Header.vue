<template>
  <div class="header">
    <div class="header__search">
      <div class="header__search__icon iconfont">&#xe630;</div>
      <input class="header__search__input" type="text">
    </div>
    <div class="header__activity iconfont">&#xe63f;</div>
    <div class="header__add">发布</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: .5rem;
  background-color: red;
  display: flex;
  &__search{
    &__icon{
      position: absolute;
    }
    &__input{
      height: .26rem;
    }
  }
}
</style>
