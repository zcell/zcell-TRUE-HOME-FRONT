<template>
  <div class="voting" :class="{'disabled': !isDisabled}">
    <div class="voting__variants">
      <button class="voting__variant"
              @click="$emit('click', voting)"
              v-for="(voting, index) in getVotings"
              :key="voting.id">
        <span class="voting__name">{{voting.question}}</span>
        <span class="voting__name">{{voting.answers}}</span>
        <span class="voting__spoler"
              :style="{width: handlerWidth(voting.answers)}"
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
          return []
        }
      },
      startDate: {
        type: Number,
        default() {
          return false
        }
      },
      dueDate: {
        type: Number,
        default() {
          return false
        }
      }
    },

    computed: {



      maxCount() {
        return this.votings.reduce((acc, next) => acc + next.answers, 0);
      },

      getVotings() {
        return this.votings.sort((a, b) => {
          return (a.answers >= b.answers) ? -1 : 1;
        });
      },

      isDisabled() {
        let start = false;
        if (this.startDate) {
          start = (+new Date().getTime() >= this.startDate * 1000 ? true : false)
        }
        if (this.dueDate) {
          let end = false;
          end = (+new Date().getTime() < this.dueDate * 1000 ? true : false);
          return start && end

        } else {
          return start
        }
      }

    },

    methods: {
      handlerWidth(answers) {
        return `${Math.ceil(answers / (this.maxCount / 100))}%`
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
