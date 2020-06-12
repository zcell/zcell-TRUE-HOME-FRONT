<template>
  <div class="page">
    <div class="container">
      <div class="page__swiper">
        <customSwiper :items="slides"
                      swiperItem="postItem"
                      caption="Актуально"
                      class="page__mainSwiper"
                      @openFeed="$emit('openFeed', {id: $event})"/>
      </div>


      <div class="page__content" id="page__content">
        <sideBar />

        <div class="page__feeds" >
          <feed @openPSWP="openPSWP($event)"
                class="page__feed"
                @openFeed=""
                :feed="feed2"/>
          <feed @openPSWP="openPSWP($event)"
                @openFeed=""
                class="page__feed"
                :feed="feed1"/>
          <div class="feed page__feed">
            Реклама
          </div>
          <feed @openPSWP="openPSWP($event)"
                @openFeed=""
                class="page__feed"
                :feed="feed2"/>
        </div>
      </div>


    </div>
    <photoswipe-custom-components :isOpen="PSWisOpen"
                                  v-if="photos && photos.length"
                                  :items="photos"
                                  :options="PSWOptions"
                                  @close="hidePhotoSwipe()"/>
  </div>
</template>

<script>


  export default {
    name: 'index',
    components: {},

    data() {
      return {
        slides: [
          {
            caption: 'Уборка мусора',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
          },
          {
            caption: 'Уборка мусора',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
          },
          {
            caption: 'Уборка мусора',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
          },
          {
            caption: 'Уборка мусора',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
          },
          {
            caption: 'Уборка мусора',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
          },
          {
            caption: 'Уборка мусора',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
          },
        ],
        feed1: {
          swiper: {
            swiperItem: 'itemImg',
            slides: [
              {
                w: '1000',
                h: '500',
                src: '/img/slide1.png',
                id: 1
              },
              {
                w: '1000',
                h: '500',
                src: '/img/slide2.png',
                id: 2
              },
              {
                w: '1000',
                h: '500',
                src: '/img/slide3.png',
                id: 3
              },
              {
                w: '1000',
                h: '500',
                src: '/img/slide1.png',
                id: 4
              },
              {
                w: '1000',
                h: '500',
                src: '/img/slide2.png',
                id: 5
              },
            ],
          },
          caption: 'Уборка мусора',
          text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической. Немецкие кригсмарине раз за разом наносили королевскому флоту существенные потери. Мощная промышленная база Германии позволяла стране быстро возмещать свои потери в технике, тогда как Великобритания, вступив в войну недостаточно подготовленной, рассматривала любые, даже самые безумные идеи, которые могли бы помочь ей противостоять противнику.',
        },
        feed2: {
          swiper: {
            swiperItem: 'postItem',
            slides: [
              {
                caption: 'Уборка мусора',
                text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
              },
              {
                caption: 'Уборка мусора',
                text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
              },
              {
                caption: 'Уборка мусора',
                text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
              },
            ],
          },
          caption: 'Собрание жильцов',
          text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
        },
        PSWisOpen: false,
        photos: [],
        PSWOptions: {
          loop: false,
          showHideOpacity: true,
          getThumbBoundsFn: false,
          showAnimationDuration: 150,
          hideAnimationDuration: 150,
          shareEl: false,
          captionEl: false,
          bgOpacity: 0.65,
          index: 1,
        },
      }
    },

    methods: {
      openPSWP(e) {

        // this.photos = images.map(x => ({...x, w: x.dimensions.width, h: x.dimensions.height, src: x.thumbOrigin2x}));
        this.PSWOptions.index = e.index;
        this.photos = e.items;

        setTimeout(() => {
          this.PSWisOpen = true;
        }, 100)

      },

      hidePhotoSwipe() {
        this.PSWisOpen = false;
      }
    },

    head() {
      return {
        title: 'TRUE HOME',
        meta: [
          {hid: 'description', name: 'description', content: ''},
          {name: 'og:type', content: 'website'},
        ],
      }
    },
  }
</script>

<style>

</style>
