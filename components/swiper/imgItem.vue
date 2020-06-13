<template>
  <div class="imgItem"
       @click="$emit('click')">
    <img :src="'https://api.home.true-studio.ru' + img.link"
         class="imgItem__img"
         :title="img.title"
         :alt="img.name">
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
