<template>
  <div class="sideBar">
    <client-only>
      <affix class="sideBar__affix"
             :offset="options"
             :scroll-affix="true"
             relative-element-selector="#page__content">


          <div class="sideBar__content" >
            <customBtn @click="$router.push({name: 'add'})"
                       v-if="loggedIn"
                       class="sideBar__btn">
              Создать публикацию
            </customBtn>

            <div class="sideBar__tab" v-if="loggedIn">

              <button type="button"
                      @click="changeTab(20)"
                      :class="{'isActive' : filtered.level === 20}"
                      class="sideBar__tabBtn">
                {{user.isHousing ? 'Дома' : 'Мой Дом'}}
              </button>

              <button type="button"
                      :class="{'isActive' : filtered.level === 10}"
                      @click="changeTab(10)"
                      class="sideBar__tabBtn">
                {{user.isHousing ? 'Город' : 'Мой город'}}
              </button>
            </div>


            <div class="sideBar__menu">
              <div class="sideBar__menuCaption" v-if="loggedIn">
                {{user.isHousing ? 'Дом' : 'Мой Дом'}}
              </div>
              <div class="sideBar__menuCaption" v-else>
                Мой город
              </div>
              <div class="sideBar__menuItems">
                <button type="button"
                        :class="{'isActive': filtered.type === 30}"
                        @click="changeType(30, 'type')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="agenda"/>
                  <div class="sideBar__menuItemCaption">
                    Обсуждения
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +4-->
<!--                  </div>-->
                </button>

                <button type="button"
                        :class="{'isActive': filtered.type === 20}"
                        @click="changeType(20, 'type')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="meeting"/>
                  <div class="sideBar__menuItemCaption">
                    Собрания
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +7-->
<!--                  </div>-->
                </button>

                <button type="button"
                        v-if="loggedIn && !user.isHousing"
                        :class="{'isActive': filtered.type === 5}"
                        @click="changeType(5, 'type')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="request"/>
                  <div class="sideBar__menuItemCaption">
                    Мои заявки
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +43-->
<!--                  </div>-->
                </button>

                <button type="button"
                        :class="{'isActive': filtered.type === 10}"
                        @click="changeType(10, 'type')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="rup"/>
                  <div class="sideBar__menuItemCaption">
                    Голосования
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +43-->
<!--                  </div>-->
                </button>
              </div>

            </div>

            <div class="sideBar__menu" v-if="loggedIn && !user.isHousing">
              <div class="sideBar__menuCaption">
                Управляющая компания
              </div>
              <div class="sideBar__menuItems">
                <button type="button"
                        :class="{'isActive': filtered.status === 10}"
                        @click="changeType(10, 'status')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="lamp"/>
                  <div class="sideBar__menuItemCaption">
                    План работ
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +4-->
<!--                  </div>-->
                </button>

                <button type="button"
                        :class="{'isActive': filtered.status === 20}"
                        @click="changeType(20, 'status')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="plan"/>
                  <div class="sideBar__menuItemCaption">
                    В работе
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +7-->
<!--                  </div>-->
                </button>

                <button type="button"
                        :class="{'isActive': filtered.status === 30}"
                        @click="changeType(30, 'status')"
                        class="sideBar__menuItem">
                  <svg-icon class="sideBar__menuItemSvg"
                            name="realization"/>
                  <div class="sideBar__menuItemCaption">
                    Реализация
                  </div>
<!--                  <div class="sideBar__menuCount">-->
<!--                    +43-->
<!--                  </div>-->
                </button>
              </div>

            </div>
          </div>


          <div class="sideBar__content">
            <a class="sideBar__promo"
               target="_blank"
               href="https://www.instagram.com/p/CANuo0uncCI/">
              <img src="/img/megafon.png"
                   srcset="/img/megafon.png 1.5x"
                   class="sideBar__promoImg"
                   title="Конкурс от Мегафон ТВ"
                   alt="Конкурс от Мегафон ТВ">
              <div class="sideBar__promoTitle">Конкурс от Мегафон ТВ</div>
              <div class="sideBar__promoText">Давайте делиться своими открытиями!</div>
            </a>
          </div>

        <div class="sideBar__content">
          <a class="sideBar__promo"
             target="_blank"
             href="https://truefood-cms.ru">
            <img src="/img/truefood.png"
                 srcset="/img/truefood.png 1.5x"
                 class="sideBar__promoImg"
                 title="Платформа True Food"
                 alt="Платформа True Food">
            <div class="sideBar__promoTitle">Платформа True Food</div>
            <div class="sideBar__promoText">Онлайн-витрина доставки еды за 24 часа!</div>
          </a>
        </div>


      </affix>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "sideBar",

    props: {
      filter : {}
    },

    data() {
      return {
        filtered: this.filter,
        options: {
          top: 30,
          bottom: 50,
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
      changeTab(id) {
        if (this.filtered.level !== id) {
          this.filtered.level = id;
          this.$emit('change', this.filtered)
        }
      },

      changeType(id, type) {
        if (type === 'type') {
          if (this.filtered.type !== id) {
            this.filtered.type = id;
            this.filtered.status = 0;
            this.$emit('change', this.filtered)
          }
        } else {
          if (this.filtered.status !== id) {
            this.filtered.status = id;
            this.filtered.type = 0;
            this.$emit('change', this.filtered)
          }
        }

      }
    }
  }
</script>

<style lang="scss">
  .sideBar {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    max-width: 260px;
    position: relative;

    &__tab {
      width: 100%;
      height: 44px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      background: $greyBlue;
      padding: 3px;
      border-radius: 10px;
      overflow: hidden;
    }

    &__tabBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100%;
      transition: all .3s;

      background-color: transparent;
      font-weight: 600;
      border-radius: 10px;


      &.isActive {
        color: $secondaryColor;
        background-color: $white;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
      }
    }

    &__promo {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__promoImg {
      height: 170px;
      margin-bottom: 10px;
    }

    &__promoTitle {
      font-weight: 600;
      margin-bottom: 4px;
    }

    &__promoText {
      max-height: 40px;
      height: 100%;
      color: $grey;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
      word-break: break-word;
      line-break: auto;
      -webkit-hyphens: manual;
      -ms-hyphens: manual;
      hyphens: manual;
      overflow: hidden;
    }

    &__menu {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 35px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__menuCaption {
      color: $grey;
      margin-bottom: 8px;
    }

    &__menuItemCaption {
       color: $black;
      font-weight: 600;
    }

    &__menuItems {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__menuItem {
      width: 100%;
      display: flex;
      align-items: center;

      background-color: $white;
      border-radius: 10px;
      height: 48px;
      padding: 0 8px;

      &.isActive {
        background-color: $greyBlue;

        .sideBar__menuItemSvg {
          fill: $black;
        }
      }


      &:hover {
        background-color: $greyBlue;

        .sideBar__menuItemSvg {
          fill: $black;
        }
      }
    }

    &__menuCount {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;

      background-color: $secondaryColor;
      border-radius: 10px;
      color: $white;
      padding: 5px 6px;
    }

    &__menuItemSvg {
      width: 16px;
      height: 16px;
      fill: $grey;
      margin-right: 14px;
    }

    &__btn {
      width: 100%;
      margin-bottom: 30px;
    }

    &__affix {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      width: 100%;
      max-width: 260px;

      &.affix-top {
        left: 0 !important;
      }

      &.affix-bottom {
        left: 0 !important;
      }

      /*&.affix {*/
      /*  top: 30px !important;*/
      /*}*/
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      background-color: $white;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

  }
</style>
