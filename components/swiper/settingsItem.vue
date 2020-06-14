<template>
  <div class="settingsItem" :class="{'time' : time}">
    <div class="settingsItem__header">
      <div class="settingsItem__caption">
        {{item.title}}
      </div>
      <actionBtn svg="options"
                 @click="showDropMeny = !showDropMeny"
                 class="settingsItem__options"/>

      <dropMenu v-click-outside="dropMenu"
                class="settingsItem__dropMenu"
                @click="$emit('changeDrop', $event)"
                :items="dropMenuItems"
                v-if="showDropMeny"/>
    </div>

    <subCaption class="settingsItem__time"
                v-if="time && item.start_date && item.due_date"
                :text="`${$moment.unix(+item.start_date).format('DD.MM.YY')} - ${$moment.unix(+item.due_date).format('DD.MM.YY')} в ${$moment.unix(+item.start_date).format('HH:mm')}`">
      <svg-icon class="subCaption__svg" name="time"/>
    </subCaption>

    <div class="settingsItem__text">
      {{item.text}}
    </div>

    <div class="settingsItem__footer">

      <div class="settingsItem__rating">

        <countBtn :count="item.comments" class="settingsItem__ratingItem mini disabled"/>

        <like class="settingsItem__ratingItem disabled mini"
              :class="{'isActive': item.isLiked}"
              :count="item.likes"/>

        <dislike class="disabled mini"
                 :class="{'isActive': item.isDisliked}"
                 :count="item.dislikes"/>
      </div>

      <avatar class="mini settingsItem__avatar"
              :src="item.avatar"
              :first-name="item.first_name"
              :last-name="item.last_name"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "settingsItem",
    props: {
      time: {
        type: Boolean,
        default() {
          return false;
        }
      },
      item: {
        default() {
          return {
            title: 'Ремонт входной двери',
            text: 'В 1942 году ситуация на западном фронте для Великобритании была катастрофической...',
            comments: 50,
            likes: 30,
            dislikes: 30,
            start_date: 13424324,
            due_date: 12343253,
            isDisliked: false,
            isLiked: false,
          }
        }
      },
      dropMenuItems: {
        type: Array,
        default() {
          return [];
        }
      }
    },

    data() {
      return {
        dropMenu: {
          handler: this.handlerDropMenu,
          middleware: this.middlewareDropMenu,
          events: ['dblclick', 'click'],
          showTooltip: true
        },
        showDropMeny: false,
      }
    },

    methods: {
      handlerDropMenu(event, el) {
        this.showDropMeny = false;
      },

      middlewareDropMenu(event, el) {
        return event.target.className !== '.dropMenu'
      },
    },
  }
</script>

<style lang="scss">
  .settingsItem {
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 140px;
    padding: 10px;
    background: #F5F7F8;
    border-radius: 10px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
    }

    &.time {
      height: 185px;
    }

    &__header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__caption {
      font-weight: 600;

      max-height: 20px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      word-wrap: break-word;
      word-break: break-word;
      line-break: auto;
      -webkit-hyphens: manual;
      -ms-hyphens: manual;
      hyphens: manual;
      overflow: hidden;
    }

    &__text {
      font-size: 11px;

      max-font-size: 45px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      word-wrap: break-word;
      word-break: break-word;
      line-break: auto;
      -webkit-hyphens: manual;
      -ms-hyphens: manual;
      hyphens: manual;
      overflow: hidden;

    }

    &__footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    &__rating {
      display: flex;
      align-items: center;
    }

    &__options {
      width: 30px;
      height: 30px;
      background-color: #F5F7F8;

      &:hover {
        background-color: white;
      }
    }

    &__ratingItem {
      margin-right: 10px;
    }

    &__time {
      width: 100%;
      margin-bottom: 10px;
      font-size: 12px;

      &.subCaption__svg {
        margin-right: 5px;
        width: 15px;
        height: 15px;
      }
    }
  }
</style>
