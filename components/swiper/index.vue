<template>
  <div class="customSwiper swiper-container"
       v-swiper:carSwiper="swiperOption">
    <ul class="customSwiper__wrapper swiper-wrapper">
      <li class="customSwiper__swiperSlide swiper-slide"
          v-for="(item, index) in items"
          @dblclick="openPSWP(index)"
          :key="+item.id + index">

        <imgItem :img="item" v-if="swiperItem === 'itemImg'"/>

      </li>

    </ul>



  </div>
</template>

<script>
  export default {
    name: "customSwiper",
    props: {
      swiperItem: {
        type: String,
        default() {
          return 'itemImg'
        }
      },
      items: {
        type: Array,
        default() {
          return [];
        }
      }
    },

    data() {
      return {

        swiperOption: {
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 10,
          // threshold: 15,
          // longSwipesRatio: 0.7,
          freeMode: true,
          freeModeMomentum: false,
          watchOverflow: true,
         // preventClicksPropagation: false,
         // preventClicks: true,
          on: {
            init: () => {},
          }
        },



      }
    },

    methods: {
      openPSWP(index) {
        this.$emit('openPSWP', index);
      }

    }


  }
</script>

<style lang="scss">
  .customSwiper {
    width: 100%;

    &__wrapper {
       list-style: none;
    }

    &__swiperSlide {
      width: auto;
      margin-right: 10px;
      user-select: none;
    }
  }
</style>
