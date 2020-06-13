<template>
  <div class="wrapper">
    <appHeader />
    <div class="wrapper__content">

        <nuxt />


    </div>

  </div>
</template>


<script>

  import appHeader from '~/components/header/index'

  export default {
    components: {
      appHeader,
    },
    mixins: [],

    mounted() {},

    data() {
      return {}
    },

    computed: {
      isMain() {
        return ['index', 'recovery', 'setting'].includes(this.$route.name);
      },
    },

    methods: {},
  }
</script>


<style lang="scss">
  .wrapper {
    position: relative;
    min-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    background-color:  #F0F0F0;

    &__content {
      position: relative;
      display: flex;
      align-items: stretch;
      flex-grow: 1;
      width: 100%;
      height: 100%;

      padding-bottom: 150px;
    }

  }

</style>
