<template>
  <div class="imgItem"
       @click="$emit('click')">
    <img :src="img.src"
         class="imgItem__img"
         alt="">
  </div>
</template>

<script>
  export default {
    name: "imgItem",
    props: {
      img: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss">
  .imgItem {
    display: inline-block;
    cursor: pointer;
    border: 1px solid #DDDDDD;
    border-radius: 10px;
    overflow: hidden;


    &__img {
       height: 144px;
    }
  }
</style>
