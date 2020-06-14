<template>
  <div class="page">
    <div class="container">
      <div class="page__settings settings">
        <div class="settings__header">
          <div class="settings__caption">
            {{user.ukName}}
          </div>
          <button type="button"
                  @click="$router.push({name: 'add'})"
                  class="settings__add">
            <svg-icon class="settings__addSvg"
                      name="plus"/>
          </button>
        </div>

        <multiselect :options="addresses"
                     v-model="home"
                     :searchable="true"
                     :close-on-select="false"
                     :options-limit="300"
                     :limit="3"
                     :max-height="600"
                     :show-no-results="false"
                     :hide-selected="true"
                     @search="asyncFind"
                     :loading="isSearch"
                     :internal-search="false"
                     :allowEmpty="false"
                     class="page__w100 page__mb30"
                     @input="getStatuses()"
                     label="Адрес дома"/>

        <div class="settings__category" v-if="users && users.length">
          <div class="settings__categoryHeader">
            <div class="settings__categoryCaption">
              Модерация
              <!--              <div class="settings__categoryCaptionNew">+4</div>-->
            </div>

            <actionBtn svg="options"
                       @click=""
                       class="settings__options"/>
          </div>
          <div class="settings__categoryCount">
            {{users.length}} {{$declOfNum( users.length, ['собственник', 'собственника', 'собственников'])}}
          </div>

          <div class="settings__users">
            <div class="settings__user" v-for="(item, index) in users"
                 :key="index + 'user'">

              <div class="settings__userInfo">
                <avatar class="mini settings__userAvatar"
                        :src="item.avatar"
                        :first-name="item.first_name"
                        :last-name="item.last_name"/>
                <div class="settings__userDfc">
                  <span class="settings__userFio">{{item.first_name}} {{item.last_name}}</span> <br/>
                </div>
              </div>
              <div class="settings__userDfc">
                <span class="settings__userTel">{{item.phone}}</span><br/>
                <span
                  class="settings__userGrey">{{item.house.city}} ул. {{item.house.street}} {{item.house.house}}</span><br/>
              </div>

              <div class="settings__userBtns">
                <button type="button"
                        @click=""
                        class="settings__userBtn">Подтвердить
                </button>
                <button type="button"
                        @click=""
                        class="settings__userBtn grey">Отказать
                </button>
              </div>


            </div>
          </div>
        </div>

        <div class="settings__category"
             v-for="(item, key) in categories"
             :key="item.id">
          <div class="settings__categoryHeader">
            <div class="settings__categoryCaption">
              {{item.name}}
              <!--              <div class="settings__categoryCaptionNew">+{{item.countNew}}</div>-->
            </div>

            <actionBtn svg="options"
                       @click=""
                       class="settings__options"/>
          </div>
          <div class="settings__categoryCount">
            {{item.items.length}} {{$declOfNum(item.items.length, ['карточка', 'карточки', 'карточки'])}}
          </div>

          <customSwiper :items="item.items"
                        caption=""
                        :request-drop="requestDrop"
                        v-if="item.items && item.items.length"
                        swiperItem="settingsItem"
                        :time="item.time"
                        class="settings__mainSwiper"
                        @openFeed="openFeed({id: $event})"/>

        </div>
      </div>


    </div>
    <vue-modal name="modal__settings"
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
                @click="$modal.hide('modal__settings')">
          <svg-icon class="modal__closeSvg" name="close"/>
        </button>

        <feed v-if="curFeed.id"
              @openPSWP="openPSWP($event)"
              @openFeed="openFeed($event)"
              :feed="curFeed"/>

      </div>
    </vue-modal>

    <photoswipe-custom-components :isOpen="PSWisOpen"
                                  v-if="photos && photos.length"
                                  :items="photos"
                                  :options="PSWOptions"
                                  @close="hidePhotoSwipe()"/>
    <scrollToTop id="#wrapper"/>
  </div>
</template>

<script>
  import Errors from '~/core/Errors'
  import flash from "../mixins/flash";
  import base from "../base.config";

  export default {
    name: "settings",
    middleware: 'auth',
    mixins: [
      flash
    ],

    async asyncData({store, redirect, params, app, $axios, query}) {

      let users = [];

      await $axios.get('common/users?status=10')
        .then(res => {
          users = res.data;
        })
        .catch(err => console.log(err))

      return {
        users
      }
    },

    data() {
      return {
        categories: {
          request: {
            id: 10,
            name: 'Заявки',
            items: [],
            time: false,
          },
          discuss: {
            id: 20,
            name: 'Обсуждаемое',
            items: [],
            time: false,
          },
          plan: {
            id: 30,
            name: 'План работ',
            items: [],
            time: true,
          },
          work: {
            id: 40,
            name: 'В работе',
            items: [],
            time: false,
          },
          realized: {
            id: 50,
            name: 'Реализованно',
            items: [],
            time: false,
          },
        },
        requestDrop: [
          {
            id: 1,
            name: 'Перетащить сюда'
          },
          {
            id: 1,
            name: 'Закрыть'
          }
        ],
        errorForm: new Errors(),
        isSearch: false,
        home: {},
        addresses: [],
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
            init: () => {
            },
          }
        },
        curFeed: {},
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

    computed: {
      loggedIn() {
        return this.$store.getters['loggedIn'];
      },
      user() {
        return this.$store.getters['user'];
      }
    },

    methods: {

      async asyncFind(e) {
        if (e.length) {
          this.$axios.get('common/houses?name=' + encodeURIComponent(e))
            .then(res => {
              if (res.data.length) {
                this.addresses = res.data.map(x => ({...x, name: `г. ${x.city} ул. ${x.street} ${x.house}`}))
              } else {
                this.addresses = [];
              }

            })
            .catch(err => {

              console.log(err);
            })
        }

      },

      async getStatuses() {

        const getRequest = async () => {
          await this.$axios.get('feed/actual?house_id=' + this.home.id)
            .then(res => {
              this.categories.request.items = res.data;
            })
        };

        const getDiscuss = async () => {
          await this.$axios.get('feed/index?type=40&house_id=' + this.home.id)
            .then(res => {
              this.categories.discuss.items = res.data;
            })
        };

        const getPlan = async () => {
          await this.$axios.get('feed/index?status=10&house_id=' + this.home.id)
            .then(res => {
              this.categories.plan.items = res.data;
            })
        };

        const getWork = async () => {
          await this.$axios.get('feed/index?status=20&house_id=' + this.home.id)
            .then(res => {
              this.categories.work.items = res.data;
            })
        };

        const getRealized = async () => {
          await this.$axios.get('feed/index?status=30&house_id=' + this.home.id)
            .then(res => {
              this.categories.realized.items = res.data;
            })
        };

        const promises = [
          getRequest(),
          getDiscuss(),
          getPlan(),
          getWork(),
          getRealized(),
        ];

        await Promise.all(
          promises.map(p => p.catch(e => e))
        );

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
            this.$modal.show('modal__settings')

          })
          .catch(err => {
            console.log(err);
          })

      },

      hidePhotoSwipe() {
        this.PSWisOpen = false;
      },

      async send() {

        let questionsFormatted = this.poll.map((v) => {
          return v.questions
        });

        let form = {
          title: this.title,
          text: this.text,
          visibility: this.visibility,
          type: this.type.id,
          poll: [{questions: questionsFormatted}],
          due_date: this.due_date ? Math.ceil(this.due_date.getTime() / 1000) : null,
          start_date: this.start_date ? Math.ceil(this.start_date.getTime() / 1000) : null,
          files: this.files.map(file => ({
            name: file.fileName,
            size: file.fileSize,
            type: file.fileType,
            link: file.filePath,
          }))
        }

        await this.$axios.post('feed/create', form)
          .then((response) => {
            this.showFlash({
              name: 'save',
              text: 'Успешно'
            });

            this.$router.push({name: 'index'});


          })
          .catch((error) => {
            error.response && error.response.data.errors ? this.errorForm.record(error.response.data.errors) : this.errorForm.record({});
            this.showFlash({
              name: 'error',
              text: 'Ошибка - проверьте заполненость обязательных полей'
            });
          });
      }

    },

    head() {
      return {
        title: 'Настройки УК',
        meta: [
          {hid: 'description', name: 'description', content: ''},
          {name: 'og:type', content: 'website'},
        ],
      }
    },
  }
</script>

<style lang="scss">
  .settings {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    &__caption {
      font-size: 20px;
      font-weight: 800;
    }

    &__add {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $secondaryColor;
    }

    &__addSvg {
      fill: $white;
      width: 10px;
      height: 10px;
    }

    &__category {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: #FFFFFF;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 10px;
    }

    &__categoryHeader {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__categoryCaption {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 800;
    }

    &__categoryCaptionNew {
      margin-left: 10px;
      width: 28px;
      height: 24px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 13px;
      font-weight: 600;
      color: $white;

      background-color: #FE805C;
      border-radius: 10px;
    }

    &__categoryCount {
      font-size: 12px;
      color: #666666;
      margin-bottom: 5px;
    }

    &__users {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
    }

    &__user {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }

    &__userInfo {
      display: flex;
      align-items: center;
      max-width: 200px;
      width: 100%;
      margin-right: 20px;
    }

    &__userAvatar {
      margin-right: 8px;
    }

    &__userFio {
      color: $primaryColor;
      font-size: 13px;
      font-weight: 600;
    }

    &__userGrey {
      font-size: 13px;
      color: #9DA1A6
    }

    &__userTel {
      font-size: 13px;
      font-weight: 600;
    }

    &__userBtns {
      display: flex;
      align-items: center;
      margin-left: auto;
    }

    &__userBtn {
      font-size: 14px;
      color: #FE805C;

      &:hover {
        text-decoration: underline;
      }

      &.grey {
        color: #9DA1A6;
        margin-left: 25px;
      }
    }
  }
</style>
