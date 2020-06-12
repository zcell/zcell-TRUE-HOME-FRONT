<template>
  <div class="comments">
    <div class="comments__comments">
      <div class="comments__count">
        <button v-if="!isLoadComments"
                class="comments__countBtn"
                @click="load()"
                type="button">
          {{countComments}}
        </button>
        <div class="comments__loading" v-else></div>
      </div>

      <comment class="comments__comment"/>
      <comment class="comments__comment"
               :isMine="true"/>
    </div>

    <div class="comments__add">
      <avatar class="comments__addAvatar"/>
      <textarea class="comments__textarea"
                placeholder="Комментарий"
                v-model="comment"
                @keydown.enter.exact.prevent=""
                @keydown.ctrl.enter="comment += '\n'"
                v-autosize
                rows="1">
      </textarea>

      <svg-icon class="comments__sendComment"
                v-if="isSending"
                name="loading"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: "commets",


    data() {
      return {
        comment: '',
        isSending: true,
        isLoadComments: false,
      }
    },

    computed: {
      countComments() {
        return `Еще 30 ${this.$declOfNum(30, ['комментарий', 'комментариев', 'комментариев'])} из 180`
      }
    },

    methods: {
      load() {

      }
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
      padding: 17px 20px;
      resize: none;
      font-size: $mainFs;
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
