<template>
  <div class="postItem">

    <div class="postItem__header">
        <avatar class="postItem__avatar mini"/>
        <div class="postItem__info">
              <div class="postItem__user">Username</div>
              <div class="postItem__time">date/time</div>
        </div>
    </div>
    <div class="postItem__caption"> {{post.caption}}</div>
    <div class="postItem__text">
      {{post.text}}
    </div>
    <div class="postItem__footer">
      <countBtn count="180" class="mini disabled"/>

      <div class="postItem__rating">
        <like class="postItem__ratingItem mini disabled"/>
        <dislike class="postItem__ratingItem mini disabled"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "postItem",
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    data() {
      return {
        post: this.item,
      }
    }
  }
</script>

<style lang="scss">
  .postItem {
    width: 220px;
    padding: 20px;
    background-color: $greyBlue;
    border-radius: 20px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      transform: translateY(-10px);
    }

    &.bc-white {
      background-color: $white;
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    &__avatar {
      margin-right: 8px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__user {
      color: $primaryColor;
      font-weight: 800;
    }

    &__time {
      color: $grey;
    }

    &__caption {
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 10px;
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
      margin-right: 12px;

      &:last-child {
        margin-right: 0;
      }
    }


    &__text {
      max-height: 80px;
      margin-bottom: 25px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 4;
      word-wrap: break-word;
      word-break: break-word;
      line-break: auto;
      -webkit-hyphens: manual;
      -ms-hyphens: manual;
      hyphens: manual;
      overflow: hidden;
    }
  }
</style>
