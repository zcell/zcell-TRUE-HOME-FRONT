<template>
  <div class="voting">
    <div class="voting__variants">
      <button class="voting__variant"
              @click=""
              v-for="(voting, index) in votings"
              :key="voting.id">
        <span class="voting__name">{{voting.name}}</span>
        <span class="voting__name">{{voting.count}}</span>
        <span class="voting__spoler"
              :style="{width: handlerWidth(voting.count)}"
              :class="{'isFirst': index === 0, 'isLast': index === votings.length - 1}"></span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "voting",
    props: {
      votings: {
        type: Array,
        default() {
          return [
            {
              name: 'Да конечно',
              id: 1,
              count: 9,
            },
            {
              name: 'Я против',
              id: 2,
              count: 7,
            },
            {
              name: 'Только при условии',
              id: 3,
              count: 5,
            },
            {
              name: 'Фигня',
              id: 4,
              count: 3,
            }
          ]
        }
      }
    },

    computed: {
      maxCount() {
        return this.votings.reduce((acc, next) => acc + next.count, 0);

      }
    },

    methods: {
      handlerWidth(count) {
          return `${Math.ceil(count / (this.maxCount / 100))}%`
      }
    }
  }
</script>

<style lang="scss">
  .voting {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: relative;
    padding-bottom: 30px;

    &.disabled {
      pointer-events: none;
    }

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background: #DDDDDD;

    }

    &__variants {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 30px;
    }

    &__name {
      font-size: 16px;
      font-weight: 600;
      max-width: 250px;
      overflow: hidden;
      z-index: 5;
    }

    &__variant {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 20px;
      height: 48px;
      padding: 0 20px;

      background-color: $greyBlue;
      border-radius: 10px;
      overflow: hidden;
      transition: all .3s;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background-color: #EDECFB;
      }
    }

    &__spoler {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0;
      background-color: #FFE99A;
      transition: all .3s;
      z-index: 2;

      &.isFirst {
        background-color: #C3F0BB;
      }

      &.isLast {
        background-color: #FFD8CD;
      }
    }
  }
</style>
