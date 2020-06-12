<template>
  <button class="disLikeBtn"
          type="button"
          @click="$emit('click')">

    <svg-icon class="disLikeBtn__svg"
              name="dislike"/>
    {{count}}
  </button>
</template>

<script>
  export default {
    name: "dislike",
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
  .disLikeBtn {
    display: flex;
    align-items: center;
    color: $grey;
    transition: all .3s;
    font-weight: 800;

    &:hover {
      color: $red;

      .disLikeBtn__svg {
        fill:$red;
      }
    }

    &.mini {
      font-size: 12px;
      .disLikeBtn__svg {
        width: 14px;
        height: 14px;
      }
    }

    &.disabled {
      &:hover {
        color: $grey;

        .disLikeBtn__svg {
          fill:$grey;
        }
      }
    }

    &.isActive {
      color: $red !important;

      .disLikeBtn__svg {
        fill:$red !important;
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
