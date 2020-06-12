<template>
  <button class="countBtn"
          @click="$emit('click')"
          type="button">
    <svg-icon class="countBtn__svg"
              name="chat"/>

   {{count}}
  </button>
</template>

<script>
  export default {
    name: "countBtn",
    props: {
      count: {
        default() {
          return 180
        }
      }
    }
  }
</script>

<style lang="scss">
  .countBtn {
    display: flex;
    align-items: center;

    transition: all .3s;
    color: $grey;
    font-weight: 600;

    &:hover {
       .countBtn__svg {
         fill: $black;
       }
         color: $black;
    }

    &__svg {
      transition: all .3s;
      width: 20px;
      height: 19px;
      fill: $grey;
      margin-right: 8px;
    }

  }
</style>
