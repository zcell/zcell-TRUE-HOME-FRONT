<template>
  <div class="sideBar">
    <client-only>
      <affix class="sideBar__affix"
             :offset="options"
             :scroll-affix="true"
             relative-element-selector="#page__content">

        <div class="sideBar__content">
          <customBtn @click="" class="sideBar__btn">
            Создать публикацию
          </customBtn>

          <div class="sideBar__menu">
            <div class="sideBar__menuCaption">
              Мой дом
            </div>
            <div class="sideBar__menuItems">
              <button type="button"
                      @click=""
                      class="sideBar__menuItem">
                <svg-icon class="sideBar__menuItemSvg"
                          name="agenda"/>
                <div class="sideBar__menuItemCaption">
                  Повестка дня
                </div>
                <div class="sideBar__menuCount">
                  +4
                </div>
              </button>

              <button type="button"
                      @click=""
                      class="sideBar__menuItem">
                <svg-icon class="sideBar__menuItemSvg"
                          name="meeting"/>
                <div class="sideBar__menuItemCaption">
                  Собрания
                </div>
                <div class="sideBar__menuCount">
                  +7
                </div>
              </button>

              <button type="button"
                      @click=""
                      class="sideBar__menuItem">
                <svg-icon class="sideBar__menuItemSvg"
                          name="request"/>
                <div class="sideBar__menuItemCaption">
                  Мои заявки
                </div>
                <div class="sideBar__menuCount">
                  +43
                </div>
              </button>
            </div>

          </div>

          <div class="sideBar__menu">
            <div class="sideBar__menuCaption">
              Публичные обращения
            </div>
            <div class="sideBar__menuItems">
              <button type="button"
                      @click=""
                      class="sideBar__menuItem">
                <svg-icon class="sideBar__menuItemSvg"
                          name="lamp"/>
                <div class="sideBar__menuItemCaption">
                  Идея
                </div>
                <div class="sideBar__menuCount">
                  +4
                </div>
              </button>

              <button type="button"
                      @click=""
                      class="sideBar__menuItem">
                <svg-icon class="sideBar__menuItemSvg"
                          name="plan"/>
                <div class="sideBar__menuItemCaption">
                  План
                </div>
                <div class="sideBar__menuCount">
                  +7
                </div>
              </button>

              <button type="button"
                      @click=""
                      class="sideBar__menuItem">
                <svg-icon class="sideBar__menuItemSvg"
                          name="realization"/>
                <div class="sideBar__menuItemCaption">
                  Реализация
                </div>
                <div class="sideBar__menuCount">
                  +43
                </div>
              </button>
            </div>

          </div>
        </div>

        <div class="sideBar__content">
          БЛОК ДЛЯ РЕКЛАМЫ
        </div>

      </affix>
    </client-only>
  </div>
</template>

<script>
  export default {
    name: "sideBar",

    data() {
      return {
        options: {
          top: 30,
          bottom: 50,
        }
      }
    }
  }
</script>

<style lang="scss">
  .sideBar {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    max-width: 260px;
    position: relative;

    &__menu {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 35px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__menuCaption {
      color: $grey;
      margin-bottom: 8px;
    }

    &__menuItemCaption {
       color: $black;
      font-weight: 600;
    }

    &__menuItems {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__menuItem {
      width: 100%;
      display: flex;
      align-items: center;

      background-color: $white;
      border-radius: 10px;
      height: 48px;
      padding: 0 8px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background-color: $greyBlue;

        .sideBar__menuItemSvg {
          fill: $black;
        }
      }
    }

    &__menuCount {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;

      background-color: $secondaryColor;
      border-radius: 10px;
      color: $white;
      padding: 5px 6px;
    }

    &__menuItemSvg {
      width: 16px;
      height: 16px;
      fill: $grey;
      margin-right: 14px;
    }

    &__btn {
      width: 100%;
      margin-bottom: 30px;
    }

    &__affix {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      width: 100%;
      max-width: 260px;

      &.affix-top {
        left: 0 !important;
      }

      &.affix-bottom {
        left: 0 !important;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      background-color: $white;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 20px;
    }

  }
</style>
