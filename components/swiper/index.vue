<template>

  <div class="customSwiper">
    <div class="customSwiper__caption" v-if="caption !== ''">{{caption}}</div>
    <div class="customSwiper__swiper swiper-container"
         v-swiper:carSwiper="swiperOption">
      <ul class="customSwiper__wrapper swiper-wrapper">
        <li class="customSwiper__swiperSlide swiper-slide"
            v-for="(item, index) in items"
            @dblclick="open(index, item.id)"
            :key="+item.id">

          <imgItem :img="item" v-if="swiperItem === 'itemImg'"/>
          <postItem :item="item" v-if="swiperItem === 'postItem'"/>
          <settingsItem v-if="swiperItem === 'settingsItem'"
                        :drop-menu-items="requestDrop"
                        :time="time"
                        :item="item"
                        @changeDrop=""/>
        </li>

      </ul>

    </div>
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
      time: {
        default() {
          return false;
        }
      },
      requestDrop: {
        default() {
          return [];
        }
      },

      items: {
        type: Array,
        default() {
          return [];
        }
      },
      caption:  {
        type: String,
        default() {
          return ''
        }
      },
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
      open(index, id) {

        if (this.swiperItem === 'itemImg') {
          this.$emit('openPSWP', index);
        } else {

          this.$emit('openFeed', id);
        }



      }

    }


  }
</script>

<style lang="scss">

</style>
