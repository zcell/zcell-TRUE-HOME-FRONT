<template>
  <div class="feed">
    <div class="feed__header">

      <div class="feed__headerLeft">

        <avatar class="feed__avatar"
                :firstName="feed.author.first_name"
                :lastName="feed.author.last_name"
                :src="feed.author.avatar"/>

        <div class="feed__avatarBox">
          <div class="feed__avatarUser">
            {{feed.author.first_name}} {{feed.author.last_name}}
          </div>
          <div class="feed__avatarTime">
            {{$moment.unix(+feed.created_at).format("DD.MM.YYYY HH:mm")}}
          </div>
        </div>

      </div>

      <div class="feed__headerRight">
        <actionBtn svg="bookMarks"
                   @click=""
                   class="feed__action "/>
        <!--        isActive-->
        <actionBtn svg="options"
                   @click="showDropMeny = !showDropMeny"
                   class="feed__action"/>
        <dropMenu v-click-outside="dropMenu"
                  class="feed__dropMenu"
                  @click="handlerDropClick($event)"
                  :items="dropMenuItems"
                  v-if="showDropMeny"/>
      </div>


    </div>

    <div class="feed__caption">
      <span class="feed__span">{{feed.title}}</span>

      <subCaption class="feed__subCaption"

                  v-if="feed.start_date && feed.due_date"
                  :text="`c ${$moment.unix(+feed.start_date).format('DD.MM.YY HH:mm')} по ${$moment.unix(+feed.due_date).format('DD.MM.YY HH:mm')}`">
        <svg-icon class="subCaption__svg" name="time"/>
      </subCaption>

      <subCaption class="feed__subCaption"
                  v-else-if="feed.start_date"
                  :text="`${$moment.unix(+feed.start_date).format('DD.MM.YY')} в ${$moment.unix(+feed.start_date).format('HH:mm')}`">
        <svg-icon class="subCaption__svg" name="time"/>
      </subCaption>
    </div>

    <div class="feed__text" v-html="feed.text">

    </div>

    <voting v-if="+feed.type === 10 && feed.poll && feed.poll.length"
            :class="{'disabled': !loggedIn}"
            :start-date="+feed.start_date"
            @click="getVoting($event)"
            :due-date="+feed.due_date"
            :votings="poll"/>

    <feedFiles v-if="getFiles && getFiles.length"
               :files="getFiles"/>

    <customSwiper :items="getPhotos"
                  swiperItem="itemImg"
                  v-if="getPhotos && getPhotos.length"
                  class="feed__swiper"
                  @openPSWP="$emit('openPSWP', {index: $event, items: getPhotos})"/>

    <customSwiper :items="feed.linked"
                  caption="Связанные публикации"
                  v-if="feed.linked && feed.linked.length"
                  swiperItem="postItem"
                  class="feed__swiper"
                  @openFeed="$emit('openFeed', {id: $event})"/>


    <div class="feed__footer">
      <countBtn :count="feed.comments"
                @click="showComment = !showComment"/>

      <div class="feed__rating">
        <like class="feed__ratingItem"
              @click="sendLike('like')"
              :class="{'isActive': isLiked, 'disabled' : !loggedIn}"
              :count="likes"/>
        <dislike class="feed__ratingItem"
                 @click="sendLike('dislike')"
                 :class="{'isActive': isDisliked, 'disabled' : !loggedIn}"
                 :count="dislikes"/>
      </div>
    </div>


    <template v-if="showComment">
      <div class="feed__hr"></div>
      <comments class="feed__comments"
                :feed-id="this.feed.id"/>
    </template>


  </div>
</template>

<script>
  import flash from "../../mixins/flash";

  export default {
    name: "feed",
    mixins: [
      flash
    ],
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
        poll: this.feed.poll,
        dislikes: this.feed.dislikes,
        isDisliked: this.feed.isDisliked,
        isLiked: this.feed.isLiked,
        likes: this.feed.likes,
        showComment: false,
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
            name: 'Копировать ссылку',
          }
        ],

      }
    },

    computed: {
      getFiles() {
        return this.feed.files.filter(file => !file.type.includes('image'))
      },

      getPhotos() {
        return this.feed.files.filter(file => file.type.includes('image'))
      },

      loggedIn() {
        return this.$store.getters['loggedIn'];
      },
      user() {
        return this.$store.getters['user'];
      },
    },

    methods: {

      handlerDropClick(e) {
         if (+e.id === 1) {
           navigator.clipboard.writeText(`${location.hostname}?feed_id=${this.feed.id}`)
         }
      },

      async sendLike(type) {
        if (this.loggedIn) {
          await this.$axios.post(`feed/${type}`, {
            feed_id: this.feed.id
          })
            .then((res) => {
              this.dislikes = res.data.dislikes;
              this.isDisliked = res.data.isDisliked;
              this.isLiked = res.data.isLiked;
              this.likes = res.data.likes;


            })
            .catch((error) => {
              console.log(error);

            });
        }
      },

      async getVoting(vote) {

        if (this.loggedIn) {
          await this.$axios.post('feed/vote', {
            poll_id: this.feed.poll_id, answer: vote.id
          })
            .then((res) => {
              this.poll = res.data;
              this.showFlash({
                name: 'save',
                text: 'Успешно'
              });

            })
            .catch((error) => {
              console.log(error);
              this.showFlash({
                name: 'error',
                text: 'Ошибка - возможно вы уже голосовали'
              });
            });
        }

      },

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
