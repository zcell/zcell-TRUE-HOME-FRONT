<template>
  <button type="button"
          v-if="showBtn"
          class="scrollToTop"
          @click="scrollToTop()">
    <svg-icon class="scrollToTop__svg"
              name="arrowUp"/>
  </button>
</template>

<script>
  export default {
    name: "scrollToTop",
    props: {
      id: {
        type: String,
        default() {
          return ''
        }
      }
    },

    mounted() {
      let html = document.querySelector('html');
      if (window) {

        window.addEventListener('scroll', (e) => {

          if (html.scrollTop > 450) {
            this.showBtn = true;
          } else {
            this.showBtn = false
          }
        })
      }
    },

    data() {
      return {
        showBtn: false,
      }
    },

    methods: {
      scrollToTop() {
        this.$scrollTo(this.id, 0, {force: true, offset: -200});
      }
    }
  }
</script>

<style lang="scss">
  .scrollToTop {
    position: fixed;
    bottom: 60px;
    right: 150px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    transition: all .3s;

    border-radius: 50%;
    background-color: $greyBlue;
    cursor: pointer;

    &:hover {
      background-color: $secondaryColor;

      .scrollToTop__svg {
        fill: $white;
      }
    }

    &__svg {
      transition: inherit;
      width: 18px;
      height: 25px;
      fill: $grey;
    }
  }
</style>
