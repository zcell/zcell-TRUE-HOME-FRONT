<template>
  <div class="header">
    <div class="container header__container">
      <div class="header__content">
        <div class="header__left">
          <svg-icon class="header__logo"
                    name="logo"/>
        </div>
        <div class="header__right">
          <actionBtn svg="bookMarks" class="header__action "/>
          <actionBtn svg="bell" class="header__action isBell "/>
          <avatar class="header__avatar"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appHeader"
  }
</script>

<style lang="scss">
  .header {
    width: 100%;
    height: 68px;
    margin-bottom: 40px;
    background-color: $white;

    &__container {
      height: 100%;
    }

    &__content {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      justify-content: space-between;
    }

    &__logo {
      width: 144px;
      height: 21px;
    }

    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &.avatar {
      margin-left: 10px;
    }
  }
</style>
