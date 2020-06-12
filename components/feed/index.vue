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
        <actionBtn svg="options" class="feed__action"/>

      </div>


    </div>

    <div class="feed__caption">
      Уборка мусора
    </div>

    <div class="feed__text">
      В 1942 году ситуация на западном фронте для Великобритании была катастрофической. Немецкие кригсмарине раз за
      разом наносили королевскому флоту существенные потери. Мощная промышленная база Германии позволяла стране быстро
      возмещать свои потери в технике, тогда как Великобритания, вступив в войну недостаточно подготовленной,
      рассматривала любые, даже самые безумные идеи, которые могли бы помочь ей противостоять противнику.
    </div>

    <customSwiper :items="slides"
                  class="feed__swiper"
                  @openPSWP="$emit('openPSWP', {index: $event, items: slides})"/>

    <div class="feed__footer">
      <countBtn count="180"/>

      <div class="feed__rating">
        <like class="feed__ratingItem"/>
        <dislike class="feed__ratingItem"/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "feed",
    props: {},

    data() {
      return {
        slides: [
          {
            w: '1000',
            h: '500',
            src: '/img/slide1.png',
            id: 1
          },
          {
            w: '1000',
            h: '500',
            src: '/img/slide2.png',
            id: 2
          },
          {
            w: '1000',
            h: '500',
            src: '/img/slide3.png',
            id: 3
          },
          {
            w: '1000',
            h: '500',
            src: '/img/slide1.png',
            id: 4
          },
          {
            w: '1000',
            h: '500',
            src: '/img/slide2.png',
            id: 5
          },
        ],
      }
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
    }

    &__avatarTime {
      color: $grey;
    }

    &__headerRight {
      display: flex;
      align-items: center;
    }

    &__action {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__caption {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
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
