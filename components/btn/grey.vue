<template>
  <button :type="type"
          class="greyBtn"
          @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "greyBtn",

    props: {
      type: {
        type: String,
        default() {
          return 'buttom'
        }
      }
    }
  }
</script>

<style lang="scss">
  .greyBtn {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 17px 25px;
    border-radius: 10px;

    white-space: nowrap;
    background-color: $greyBlue;
    color: $primaryColor;
    font-size: $mainFs;
    font-weight: 600;

    transition: all .3s;

    &:hover {
      background-color: #EDECFB;
    }
  }
</style>
