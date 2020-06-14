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
    font-weight: 800;
    &:hover {
      color: $green;

      .likeBtn__svg {
        fill: $green;
      }
    }

    &.disabled {
      pointer-events: none;
      &:hover {
        color: $grey;

        .likeBtn__svg {
          fill: $grey;
        }
      }
    }

    &.mini {
      font-size: 12px;

      .likeBtn__svg {
        width: 14px;
        height: 14px;
      }
    }

    &.isActive {
      color: $green !important;

      .likeBtn__svg {
        fill: $green !important;
      }
    }

    &__svg {
      transition: all .3s;
      fill: $grey;
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }
  }
</style>
