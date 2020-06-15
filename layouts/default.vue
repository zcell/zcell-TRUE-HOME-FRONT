<template>
  <div class="wrapper" id="wrapper">

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(64898518, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            ecommerce:"dataLayer"
        });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/64898518" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->

    <appHeader />
    <div class="wrapper__content" id="wrapper__content">

        <nuxt />


    </div>
    <div class="wrapper__notification"
         :class="{'is-active' : getNotification.active.status,
                        'save': getNotification.active.name === 'save' || getNotification.active.name === 'send',
                        'error': getNotification.active.name === 'error'}">
      {{ getNotification.active.text }}
      <button type="button"
              @click="closeNotification()"
              class="wrapper__notificationBtn">
        <svg-icon class="wrapper__notificationSvg"
                  name="close"/>
      </button>
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
      getNotification() {
        return this.$store.getters['notification/getNotification'];
      },
    },

    methods: {
      closeNotification() {
        this.$store.commit('notification/defaultNotification');
      },
    },
  }
</script>


<style lang="scss">
  .wrapper {
    position: relative;
   // min-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    background-color:  #F0F0F0;

    &__notification {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;

      align-items: center;
      justify-content: center;
      z-index: 200;

      text-transform: uppercase;
      font-size: 14px;
      color: white;
      opacity: 0.7;
      letter-spacing: 1.1px;

      &.is-active {
        display: flex;
      }

      &.save {
        background-color: #64B003;
      }

      &.error {
        background-color: #D50000;
      }
    }

    &__notificationBtn {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

    }

    &__notificationSvg {
      width: 12px;
      height: 12px;
      fill: white;
    }

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
