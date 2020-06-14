<template>
  <div class="comments">
    <div class="comments__comments">
      <div class="comments__count" v-if="comments.length < +commentsMeta.total">
        <button v-if="!isLoadComments"
                class="comments__countBtn"
                @click="getComments(+commentsMeta.page + 1)"
                type="button">
          {{countComments}}
        </button>
        <div class="comments__loading" v-else></div>
      </div>

      <comment class="comments__comment"
               v-for="comment in comments"
               :comment="comment"
               @sendLike="sendLike($event, comment)"
               :is-mine="+comment.user_id === +user.id"
               :key="comment.id + 'comment'"/>

      <h2 class="comments__empty" v-if="comments.length === 0">Комментариев нет</h2>

    </div>

    <div class="comments__add" v-if="loggedIn">
      <avatar class="comments__addAvatar"
              :src="user.avatar"
              :first-name="user.first_name"
              :last-name="user.last_name"/>

      <textarea class="comments__textarea"
                placeholder="Комментарий"
                v-model="comment"
                v-autosize
                rows="1">
      </textarea>

      <svg-icon class="comments__sendComment"
                v-if="isSending"
                name="loading"/>

      <button type="button"
              v-if="!isSending && comment.length"
              @click="sendComment()"
              class="comments__send">

        <svg-icon class="comments__sendSvg"
                  name="vector"/>
      </button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "commets",

    props: {
      feedId: {}
    },

    async mounted() {
      await this.getComments(0, 1);
    },

    data() {
      return {
        comment: '',
        isSending: false,
        isLoadComments: false,
        comments: [],
        commentsMeta: {
          total: 0
        },
      }
    },

    computed: {
      loggedIn() {
        return this.$store.getters['loggedIn'];
      },
      user() {
        return this.$store.getters['user'];
      },
      countComments() {
        return `Еще ${+this.commentsMeta.total - this.comments.length <= 30 ? +this.commentsMeta.total - this.comments.length : 30} ${this.$declOfNum(+this.commentsMeta.total - this.comments.length <= 30 ? +this.commentsMeta.total - this.comments.length : 30, ['комментарий', 'комментариев', 'комментариев'])} из ${+this.commentsMeta.total - this.comments.length}`
      }
    },

    methods: {

      async sendLike(type, comment) {
        if (this.loggedIn) {
          await this.$axios.post(`comments/${type}`, {
            comment_id: comment.id
          })
            .then((res) => {
              comment.dislikes = res.data.dislikes;
              comment.isDisliked = res.data.isDisliked;
              comment.isLiked = res.data.isLiked;
              comment.likes = res.data.likes;


            })
            .catch((error) => {
              console.log(error);

            });
        }
      },

      async getComments(page = 0, limit = 30) {
        this.isLoadComments = true;


        await this.$axios.get(`comments?limit=${limit}&page=${page}&feed_id=${this.feedId}`)
          .then(res => {
            if (page) {

              this.comments.unshift(...res.data.items.reverse())

            } else {
              this.comments = res.data.items;
            }

            this.commentsMeta = res.data.meta;
          })
          .catch(err => console.log(err))
        this.isLoadComments = false;
      },

      async sendComment() {
        this.isSending = true;

        //   await this.$axios.get(`comments/create?feed_id=${this.feedId}`)
        await this.$axios.post(`comments/create`, {
          text: this.comment,
          feed_id: this.feedId,
          user_id: this.user.id
        })
          .then(res => {
            this.comment = '';
            this.comments.push(res.data);
          })
          .catch(err => console.log(err))
        this.isSending = false;

      },

    }
  }
</script>

<style lang="scss">
  .comments {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__comments {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 40px;
    }

    &__empty {
      margin-bottom: 0;
      text-align: center;
    }

    &__count {
      height: 50px;
      width: 100%;
      margin-bottom: 20px;
    }

    &__countBtn {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      color: $grey;
      background-color: $greyBlue;
      border-radius: 48px;

      transition: all .3s;

      &:hover {
        color: $secondaryColor;
      }
    }

    &__comment {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__add {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
    }

    &__addAvatar {
      margin-right: 12px;
    }

    &__sendComment {
      position: absolute;
      top: 17px;
      right: 15px;

      width: 18px;
      height: 18px;
      fill: $primaryColor;
      animation: loading 1s linear infinite;
    }

    &__textarea {
      width: 446px;
      background-color: $white;
      border: 1px solid #DDDDDD;
      border-radius: 10px;
      color: $black;
      padding: 17px 55px 17px 20px;
      resize: none;
      font-size: $mainFs;
    }

    &__send {
      position: absolute;
      right: 4px;
      top: 4px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: $secondaryColor;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__sendSvg {
      stroke: $white;
      width: 18px;
      height: 13px;
    }

    &__loading {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:before {
        content: '';
        width: 40px;
        height: 40px;

        border-radius: 50%;
        border: 4px solid $grey;
        border-top-color: transparent;
        animation: loading 1s linear infinite;

      }
    }
  }


  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
