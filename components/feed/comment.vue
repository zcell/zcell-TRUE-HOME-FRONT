<template>
  <div class="comment" :class="{'isMine' : isMine}">
    <avatar class="comment__avatar mini"
            :src="comment.user.avatar"
            :first-name="comment.user.first_name"
            :last-name="comment.user.last_name"/>
    <div class="comment__body">
      <svg-icon class="comment__arr"
                name="arrComm"/>
      <div class="comment__header">
        <div class="comment__user">{{comment.user.first_name}} {{comment.user.last_name}}</div>
        <div class="comment__time" v-if="comment.created_at">{{$moment.unix(+comment.created_at).format('DD.MM.YY HH:mm')}}</div>

        <button type="button"
                v-if="isMine"
                class="comment__action"
                @click="showDropMeny = !showDropMeny">

          <svg-icon class="comment__actionSvg"
                    name="options"/>

          <dropMenu v-click-outside="dropMenu"
                    :items="dropMenuItems"
                    v-if="showDropMeny"/>
        </button>

      </div>
      <div class="comment__text">
        {{comment.text}}
      </div>

      <div class="comment__footer">
        <button type="button"
                class="comment__answer"
                @click="">Ответить
        </button>

        <div class="comment__rating">

          <like class="comment__ratingItem"
                @click="$emit('sendLike', 'like')"
                :class="{'isActive': comment.isLiked, 'disabled' : !loggedIn}"
                :count="comment.likes"/>
          <dislike class="comment__ratingItem"
                   @click="$emit('sendLike', 'dislike')"
                   :class="{'isActive': comment.isDisliked, 'disabled' : !loggedIn}"
                   :count="comment.dislikes"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",

    props: {
      isMine: {
        type: Boolean,
        default() {
          return false
        }
      },
      comment: {
        type: Object,
        default() {
          return {}
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
  .comment {
    display: flex;
    align-items: flex-start;
    width: 100%;

    &.isMine {
      .comment {
        &__avatar {
          order: 2;
          margin-right: 0;
          margin-left: 10px;
        }

        &__body {
          order: 1;
          border-radius: 20px 0 20px 20px;
        }

        &__arr {
          position: absolute;
          left: auto;
          right: -5px;
          top: 0;
          width: 6px;
          height: 20px;
          transform: scaleX(-1);
          fill: $greyBlue;
        }


      }
    }

    &__avatar {
      margin-right: 10px;
    }

    &__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding: 20px;
      background-color: $greyBlue;
      border-radius: 0 20px 20px 20px;
    }

    &__arr {
      position: absolute;
      left: -5px;
      top: 0;
      width: 6px;
      height: 20px;

      fill: $greyBlue;
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      width: 100%;
    }

    &__action {
      position: relative;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;

      border-radius: 50%;
      background-color: $greyBlue;
      transition: all .3s;

      &:hover {
        background-color: $white;

        .comment__actionSvg {
          fill: $black;
        }
      }
    }

    &__actionSvg {
      fill: $grey;
      width: 8px;
      height: 14px;
    }

    &__user {
      color: $primaryColor;
      margin-right: 10px;
      font-weight: 800;
    }

    &__time {
      color: $grey;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 15px;
    }

    &__answer {
      color: $grey;
      font-weight: 800;
      transition: all .3s;

      &:hover {
         color: $secondaryColor;
      }
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
