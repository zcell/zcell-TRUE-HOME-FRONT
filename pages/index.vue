<template>
  <div class="page" id="main">
    <div class="container">
      <div class="page__swiper" v-if="loggedIn">

        <div class="customSwiper page__mainSwiper" v-if="actuals && actuals.length">
          <div class="customSwiper__caption">Актуально</div>
          <div class="customSwiper__swiper swiper-container"
               v-swiper:carSwiper="swiperOption">
            <ul class="customSwiper__wrapper swiper-wrapper">
              <li class="customSwiper__swiperSlide swiper-slide"
                  v-for="(item, index) in actuals"
                  @dblclick="openFeed({id:item.id})"
                  :key="+item.id + 'actuals'">

                <postItem :item="item" class="bc-white"/>
              </li>

            </ul>

          </div>
        </div>
      </div>


      <div class="page__content"
           id="page__content">
        <sideBar :filter="filter"
                 @change="changeFilter($event)"/>

        <div class="page__feeds">

          <feed v-for="(feed, index) in feeds"
                :key="feed.id + 'feed'"
                @openPSWP="openPSWP($event)"
                @openFeed="openFeed($event)"
                class="page__feed"
                :feed="feed"/>

        </div>
      </div>


    </div>
    <photoswipe-custom-components :isOpen="PSWisOpen"
                                  v-if="photos && photos.length"
                                  :items="photos"
                                  :options="PSWOptions"
                                  @close="hidePhotoSwipe()"/>

    <vue-modal name="modal__auth"
               class="modal widget__modal"
               height="auto"
               width="370px"
               :scrollable="false"
               :clickToClose="false"
               :adaptive="true"
               @before-open="">
      <div class="modal__boxInner">
        <button type="button"
                class="modal__close"
                @click="$modal.hide('modal__auth')">
          <svg-icon class="modal__closeSvg" name="close"/>
        </button>

        <modalAuth/>

      </div>
    </vue-modal>

    <vue-modal name="modal__feed"
               class="modal widget__modal"
               height="auto"
               width="600px"
               :scrollable="false"
               :clickToClose="false"
               :adaptive="true"
               @before-open="">
      <div class="modal__boxInner">
        <button type="button"
                class="modal__close"
                @click="$modal.hide('modal__feed')">
          <svg-icon class="modal__closeSvg" name="close"/>
        </button>

        <feed v-if="curFeed.id"
              @openPSWP="openPSWP($event)"
              @openFeed="openFeed($event)"
              :feed="curFeed"/>

      </div>
    </vue-modal>

    <scrollToTop id="#main"/>
  </div>
</template>

<script>

  import Errors from '~/core/Errors'
  import base from '../base.config'

  export default {
    name: 'index',
    components: {},


    async asyncData({store, redirect, params, app, $axios, query}) {

      let feeds = [];
      let actuals = [];

      let defaultLimit = base.defaultLimit;

      const getFeeds = async () => {
        await $axios.get('feed/index?level=20&limit=' + defaultLimit)
          .then(res => {
            feeds = res.data;
          })
      };

      const getActuals = async () => {
        await $axios.get('feed/actual')
          .then(res => {
            actuals = res.data;
          })
      };



      const promises = [
        getFeeds(),
      ];

      if (store.getters['loggedIn']) {
        promises.push(getActuals());
      }

      await Promise.all(
        promises.map(p => p.catch(e => e))
      );

      return {
        feeds,
        actuals,
        defaultLimit
      }
    },

    async mounted() {
      this.createObserver();

      if (this.$route.query && this.$route.query.feed_id && this.$route.query.feed_id !== '') {
        await this.openFeed({id: this.$route.query.feed_id})
      }
    },

    data() {
      return {
        swiperOption: {
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 20,
          // threshold: 15,
          // longSwipesRatio: 0.7,
          freeMode: true,
          freeModeMomentum: false,
          watchOverflow: true,
          // preventClicksPropagation: false,
          // preventClicks: true,
          on: {
            init: () => {
            },
          }
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
        observer: false,
        isSending: false,
        curFeed: {},
        filter: {
          level: 20,
          type: 30,
          status: 0,
        }
      }
    },

    computed: {
      bundleUrl() {
        let url = `${this.loggedIn ? `&level=${this.filter.level}` : '&level=10'}${![0,5].includes(+this.filter.type) ? `&type=${this.filter.type}` : ''}`+
          `${+this.filter.type === 5 ? `&author_id=${this.user.id}` : ''}` +
          `${+this.filter.status !== 0 ? `&status=${this.filter.status}` : ''}`;

        return url
      },

      loggedIn() {
        return this.$store.getters['loggedIn'];
      },
      user() {
        return this.$store.getters['user'];
      }
    },

    methods: {

      async changeFilter(e) {
        this.filter = e;
        await this.getFeeds();
        if (this.loggedIn) {
          await this.getActuals();
        }

      },

      async getActuals() {
        this.isSending = true;

        await this.$axios.get(`feed/actual`)
          .then(res => {
            this.actuals = res.data;
          })
          .catch(err => console.log(err))
        this.isSending = false;
      },

      async getFeeds(id = false, payload = '') {
        this.isSending = true;

        await this.$axios.get(`feed/index?limit=${this.defaultLimit}${id ? '&from_id=' + id : ''}${this.bundleUrl}`)
          .then(res => {

            if (id) {
              this.feeds = this.feeds.concat(res.data)
            } else {
              this.feeds = res.data;
            }

            if (res.data.length >= 10) {
              setTimeout(() => {
                this.createObserver();
              }, 300)
            }

          })
          .catch(err => console.log(err))
        this.isSending = false;
      },


      createObserver() {

        this.observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(async entry => {
            if (entry.isIntersecting) {
              this.observer.unobserve(entry.target);
              entry.target.classList.remove('observer');

              if (!this.isSending) {
                await this.getFeeds(this.feeds[this.feeds.length - 1].id);
              }
            }

          })
        }, {
          threshold: 0.5
        })

        let feed = this.searchLastFeed();
        if (feed) {
          this.observer.observe(feed)
        }


      },

      searchLastFeed() {
        let lastFeed = document.querySelectorAll('.feed.page__feed');
        if (lastFeed.length) {
          lastFeed = lastFeed[lastFeed.length - 1];
          lastFeed.classList.add('observer');
          return lastFeed
        }
        return false

      },


      openPSWP(e) {

        this.photos = e.items.map(x => ({...x, w: 1000, h: 600, src: 'https://api.home.true-studio.ru' + x.link}));
        this.PSWOptions.index = e.index;

        setTimeout(() => {
          this.PSWisOpen = true;
        }, 100)

      },

      async openFeed(e) {
        await this.$axios.get('feed/index?id=' + e.id)
          .then(res => {
            this.curFeed = res.data[0];
            this.$modal.show('modal__feed')

          })
          .catch(err => {
            console.log(err);
          })

      },

      hidePhotoSwipe() {
        this.PSWisOpen = false;
      },
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
