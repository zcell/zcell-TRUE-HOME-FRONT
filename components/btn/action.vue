<template>
  <button type="button"
          class="actionBtn"
          @click="$emit('click')">
    <svg-icon class="actionBtn__svg"
              :name="svg"/>
  </button>
</template>

<script>
  export default {
    name: "actionBtn",
    props: {
      svg: {
        type: String,
        default() {
          return ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .actionBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;

    border-radius: 50%;
    background-color: $white;
    transition: all .3s;

    &.isActive {
        background-color: $secondaryColor !important;

      .actionBtn__svg {
        fill: $white !important;
      }
    }

    &:hover {
      background-color: $greyBlue;

      .actionBtn__svg {
        fill: $black;
      }
    }

    &__svg {
      transition: all .3s;
      fill: $grey;
      width: 18px;
      height: 18px;
    }
  }
</style>
