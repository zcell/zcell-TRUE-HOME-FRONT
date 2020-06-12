<template>
  <div class="dropMenu">
    <button class="dropMenu__item"
            v-if="items && items.length"
            v-for="item in items"
            :key="item.id"
            @click="$emit('click', item)"
            type="button">
      <span class="dropMenu__text">{{item.name}}</span>

    </button>
  </div>
</template>

<script>
  export default {
    name: "dropMenu",

    props: {
      items: {
        type: Array,
        default() {
          return []
        }
      }
    },

    data() {
      return {}
    },

    methods: {}
  }
</script>

<style lang="scss">
  .dropMenu {
    position: absolute;
    right: -15px;
    top: 40px;
    background-color: $white;
    border-radius: 20px;
    padding: 10px 0;
    width: 230px;
    z-index: 10;
    border: 1px solid $greyBlue;


    &:before {
      content: "";
      position: absolute;
      top: -3px;
      right: 18px;
      width: 10px;
      height: 10px;
      transform: rotate(43deg) translateX(-50%);
      z-index: 11;
      background-color: $white;
      border-top: 1px solid $greyBlue;
      border-left: 1px solid $greyBlue;
    }



    &__item {
      display: flex;
      align-items: center;
      height: 38px;
      width: 100%;

      font-size: 13px;
      margin-bottom: 14px;
      padding: 0 20px;
      transition: all .3s;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background-color: $greyBlue;
      }

    }
  }
</style>
