<template>
  <button class="likeBtn"
          type="button"
          @click="$emit('click')">

    <svg-icon class="likeBtn__svg"
              name="like"/>
    {{count}}
  </button>
</template>

<script>
  export default {
    name: "like",
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
  .likeBtn {
    display: flex;
    align-items: center;
    color: $grey;
    transition: all .3s;

    &:hover {
      color: $green;

      .likeBtn__svg {
        fill:$green;
      }
    }

    &.isActive {
      color: $green !important;

      .likeBtn__svg {
        fill:$green !important;
      }
    }

    &__svg {
      transition: all .3s;
      fill:$grey;
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }
  }
</style>
