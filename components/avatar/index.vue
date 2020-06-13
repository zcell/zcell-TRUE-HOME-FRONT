<template>
  <div class="avatar" @click="$emit('click')">
    <img :src="'https://api.home.true-studio.ru' + src"
         alt=""
         v-if="src && src !== ''"
         class="avatar__img">
    <span class="avatar__span" v-else>{{nameUser}}</span>
  </div>
</template>

<script>
  export default {
    name: "avatar",
    props: {
      src: {
        type: String,
        default() {
          return '/img/avatar.png'
        }
      },
      firstName: {
        type: String,
        default() {
          return 'Николай'
        }
      },
      lastName: {
        type: String,
        default() {
          return 'Шуваев'
        }
      }
    },

    computed: {
      nameUser() {
          if (this.firstName && this.lastName) {
            return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`
          }
          return ''
       }
    }

  }
</script>

<style lang="scss">
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    min-width: 40px;

    border-radius: 50%;
    overflow: hidden;

    &.mini {
      width: 34px;
      height: 34px;
      min-width: 34px;
    }

    &__img {
      height: 100%;
      max-width: none;
    }

    &__span {
      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 600;
      color: $white;

      width: 100%;
      height: 100%;
      background-color: $primaryColor;
    }
  }
</style>
