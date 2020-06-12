<template>
  <div class="avatar">
    <img :src="src"
         alt=""
         class="avatar__img">
  </div>
</template>

<script>
  export default {
    name: "avatar",
    props: {
      src: {
        type: String,
        default() {
          return '/img/avatar.png'
        }
      }
    }
  }
</script>

<style lang="scss">
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border-radius: 50%;
    overflow: hidden;
  }
</style>
