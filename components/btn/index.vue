<template>
  <button :type="type"
          class="btn"
          @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "btn",

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
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 17px 55px;
    border-radius: 48px;

    background-color: $secondaryColor;
    color: $white;
    font-size: $mainFs;

    transition: all .3s;
  }
</style>
