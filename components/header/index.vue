<template>
  <div class="header">
    <div class="container header__container">
      <div class="header__content">
        <div class="header__left">
          <n-link :to="{name: 'index'}" class="header__link">
            <svg-icon class="header__logo"
                      name="logo"/>
          </n-link>

        </div>
        <div class="header__right">
          <actionBtn svg="bookMarks" class="header__action" v-if="loggedIn"/>
          <actionBtn svg="bell" class="header__action isBell"/>
          <div class="header__drop">
            <avatar class="header__avatar"
                    :src="user.avatar"
                    @click="showDropMeny = !showDropMeny"
                    :first-name="user.first_name"
                    :last-name="user.last_name"
                    v-if="loggedIn"/>

            <dropMenu v-click-outside="dropMenu"
                      class="header__dropMenu"
                      @click="dropHandler($event)"
                      :items="dropMenuItems"
                      v-if="showDropMeny"/>
          </div>

          <customBtn @click="$modal.show('modal__auth')"
                     v-if="!loggedIn"
                     class="header__btn">
            Войти
          </customBtn>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appHeader",

    data() {
      return {
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
            name: 'Профиль',
          },
          {
            id: 2,
            name: 'Выйти'
          }

        ]
      }
    },

    computed: {
      loggedIn() {
        return this.$store.getters['loggedIn'];
      },
      user() {
        return this.$store.getters['user'];
      }
    },

    methods: {

      async dropHandler(e) {
        if (+e.id === 1) {
          this.$router.push({name: 'account'});
        }
        if (+e.id === 2) {
          await this.$auth.logout();
        }
        this.showDropMeny = false;
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
  .header {
    width: 100%;
    height: 68px;
    margin-bottom: 40px;
    background-color: $white;

    &__container {
      height: 100%;
    }

    &__content {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      justify-content: space-between;
    }

    &__drop {
      position: relative;
      margin-left: 5px;
    }

    &__dropMenu {
      right: -10px !important;
      top: 50px !important;
    }

    &__avatar {
      cursor: pointer;
    }

    &__btn {
      margin-left: 5px;
      padding: 15px 30px !important;
    }

    &__logo {
      width: 165px;
      height: 30px;
    }

    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &.avatar {
      margin-left: 10px;
    }
  }
</style>
