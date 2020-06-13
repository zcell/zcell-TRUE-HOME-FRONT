<template>
  <div class="comments">
    <div class="comments__comments">
      <div class="comments__count">
        <button v-if="!isLoadComments"
                class="comments__countBtn"
                @click="getComments()"
                type="button">
          {{countComments}}
        </button>
        <div class="comments__loading" v-else></div>
      </div>

      <comment class="comments__comment"
               v-for="comment in comments"
               :comment="comment"
               :is-mine="+comment.user_id === +user.id"
               :key="comment.id + 'comment'"/>

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
      await this.getComments();
    },

    data() {
      return {
        comment: '',
        isSending: false,
        isLoadComments: false,
        comments: [],
        commentsMeta: {},
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
        return `Еще 30 ${this.$declOfNum(30, ['комментарий', 'комментариев', 'комментариев'])} из 180`
      }
    },

    methods: {

      async getComments(offset = 0) {
        this.isLoadComments = true;

        //   await this.$axios.get(`comments?feed_id=${this.feedId}`)
        await this.$axios.get(`comments?feed_id=40`)
          .then(res => {
            this.comments = res.data
          })
          .catch(err => console.log(err))
        this.isLoadComments = false;
      },

      async sendComment() {
        this.isSending = true;

        //   await this.$axios.get(`comments/create?feed_id=${this.feedId}`)
        await this.$axios.post(`comments/create`, {
          text: this.comment,
          feed_id:40,
          user_id: this.user.id
        })
          .then(res => {

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
