<template>
  <div class="feed">
    <div class="feed__header">

      <div class="feed__headerLeft">

        <avatar class="feed__avatar"/>

        <div class="feed__avatarBox">
          <div class="feed__avatarUser">
            Username
          </div>
          <div class="feed__avatarTime">
            date/time
          </div>
        </div>

      </div>

      <div class="feed__headerRight">
        <actionBtn svg="bookMarks" class="feed__action isActive"/>
        <actionBtn svg="options"
                   @click="showDropMeny = !showDropMeny"
                   class="feed__action"/>
        <dropMenu v-click-outside="dropMenu"
                  class="feed__dropMenu"
                  :items="dropMenuItems"
                  v-if="showDropMeny"/>
      </div>


    </div>

    <div class="feed__caption">
      <span class="feed__span">{{feed.caption}}</span>

      <subCaption class="feed__subCaption" text="14.07.20 в 18:00">
        <svg-icon class="subCaption__svg" name="time"/>
      </subCaption>
    </div>

    <div class="feed__text">
      {{feed.text}}
    </div>

    <customSwiper :items="feed.swiper.slides"
                  :swiperItem="feed.swiper.swiperItem"
                  class="feed__swiper"
                  @openFeed="$emit('openFeed', {id: $event})"
                  @openPSWP="$emit('openPSWP', {index: $event, items: feed.swiper.slides})"/>

    <div class="feed__footer">
      <countBtn count="180"
                @click="showComments = !showComments"/>

      <div class="feed__rating">
        <like class="feed__ratingItem"/>
        <dislike class="feed__ratingItem"/>
      </div>
    </div>

<!--    <slide-up-down :active="showComments"-->
<!--                   class="">-->
<!--    -->
<!--    </slide-up-down>-->

    <template v-if="showComments">
      <div class="feed__hr"></div>
      <comments class="feed__comments" />
    </template>


  </div>
</template>

<script>
  export default {
    name: "feed",
    props: {
      feed: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    data() {
      return {
        showComments: true,
        dropMenu: {
          handler: this.handlerDropMenu,
          middleware: this.middlewareDropMenu,
          events: ['dblclick', 'click'],
          showTooltip: true
        },
        showDropMeny: false,
        dropMenuItems: [
          {
            id: 1,
            name: 'Редактировать',
          },
          {
            id: 2,
            name: 'Удалить'
          }
        ]
      }
    },

    methods: {
      handlerDropMenu(event, el) {
        this.showDropMeny = false;
      },

      middlewareDropMenu(event, el) {
        return event.target.className !== '.dropMenu'
      },
    }
  }
</script>

<style lang="scss">
  .feed {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 540px;
    padding: 20px;

    background-color: $white;
    border-radius: 20px;


    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
    }

    &__comments {

    }

    &__hr {
      margin: 25px 0;
      width: 100%;
      height: 1px;
      background-color: #DDDDDD;
    }

    &__headerLeft {
      display: flex;
      align-items: center;
    }

    &__avatar {
      margin-right: 20px;
    }

    &__avatarBox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__avatarUser {
      color: $primaryColor;
      font-weight: 800;
    }

    &__avatarTime {
      color: $grey;
    }

    &__headerRight {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__action {
      margin-left: 4px;

      &:first-child {
        margin-left: 0;
      }
    }

    &__dropMenu {
      right: -7px !important;
      top: 55px !important;
    }

    &__caption {
      width: 100%;

      margin-bottom: 20px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__span {
      font-size: 20px;
      font-weight: 800;
    }

    &__text {
      width: 100%;
      margin-bottom: 30px;
    }

    &__swiper {
      margin-bottom: 30px;
    }

    &__footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__rating {
      display: flex;
      align-items: center;
    }

    &__ratingItem {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
