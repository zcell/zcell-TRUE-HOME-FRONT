<template>
  <div class="postItem">

    <div class="postItem__header">

        <avatar class="postItem__avatar mini"
                v-if="item.author"
                :firstName="item.author.first_name"
                :lastName="item.author.last_name"
                :src="item.author.avatar"/>
        <div class="postItem__info"  v-if="item.author">
              <div class="postItem__user">{{item.author.first_name}} {{item.author.last_name}}</div>
              <div class="postItem__time"> {{$moment.unix(+item.created_at).format("DD.MM.YYYY HH:mm")}}</div>
        </div>
    </div>
    <div class="postItem__caption"> {{item.title}}</div>
    <div class="postItem__text">
      {{item.text}}
    </div>
    <div class="postItem__footer">
      <countBtn :count="item.comments" class="mini disabled"/>

      <div class="postItem__rating">


        <like class="postItem__ratingItem mini disabled"
              :class="{'isActive': item.isLiked}"
              :count="item.likes"/>
        <dislike class="postItem__ratingItem mini disabled"
                 :class="{'isActive': item.isDisliked}"
                 :count="item.dislikes"/>
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

      }
    }
  }
</script>

<style lang="scss">
  .postItem {

    padding: 20px;
    background-color: $greyBlue;
    border-radius: 20px;
    cursor: pointer;
    transition: all .3s;
    min-height: 248px;

    display: flex;
    flex-direction: column;
    width: 220px;

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
      margin-top: auto;
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
