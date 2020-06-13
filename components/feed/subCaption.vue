<template>
  <div class="subCaption">
    <slot></slot>
    {{text}}
  </div>
</template>

<script>
  export default {
    name: "subCaption",
    props: {
      text: {
        type: String,
        default() {
          return ''
        }
      }
    }

  }
</script>

<style lang="scss">
  .subCaption {
    display: flex;
    align-items: center;
    padding: 8px 10px;

    font-weight: 800;

    background-color: #FFE99A;
    border-radius: 10px;

    &__svg {
      margin-right: 12px;
      width: 20px;
      height: 20px;
      fill: $black;
    }
  }
</style>
