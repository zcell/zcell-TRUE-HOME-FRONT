<template>
  <div class="input" :class="{'disabled' : disabled , 'is-error' : textError}">
    <div class="input__name" v-if="title !== ''">
      {{title}}
    </div>
    <input v-if="!maskActive"
           :type="type"
           class="input__input"
           :placeholder="placeholder"
           :value="value"
           :name="name"
           @blur="$emit('blur', $event.target.value)"
           @click="$emit('click')"
           @focus="$emit('focus')"
           @input="$emit('input', $event.target.value)"
           v-bind="$attrs"
           :disabled="disabled">

    <input v-else
           v-mask="mask"
           class="input__input"
           :value="value"
           :name="name"
           :placeholder="placeholder"
           @blur="$emit('blur', $event.target.value)"
           @click="$emit('click')"
           @focus="$emit('focus')"
           @input="$emit('input', $event.target.value)"
           :disabled="disabled">

    <div class="input__error">{{ textError }}</div>
    <button type="button"
            class="input__close"
            @click="$emit('close')">
      <svg-icon class="input__closeSvg"
                name="close"/>
    </button>

  </div>
</template>

<script>
  export default {
    name: "inputCustom",


    props: {
      value: {},
      name: {
        type: String,
        default() {
          return '';
        }
      },
      title: {
        type: String,
        default() {
          return 'title';
        }
      },
      type: {
        type: String,
        default() {
          return 'text';
        }
      },
      placeholder: {
        type: String,
        default() {
          return 'placeholder';
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      textError: {
        type: String,
        default() {
          return '';
        }
      },
      mask: {
        default() {
          return ''
        }
      },
      maskActive: {
        type: Boolean,
        default() {
          return false
        }
      },
    }
  }
</script>

<style lang="scss">
  .input {
    position: relative;

    &.close {
      position: relative;
      .input__input {
        padding: 17px 45px 17px 20px;
      }

      .input__close {
        display: flex;
      }
    }

    &.disabled {
      .input__input {
        pointer-events: none;
        background-color: #F6F8F9;
      }
    }

    &.is-error {
      .input__error {
        display: block;
      }

      .input__input {
        border: 1px solid #F55959;
        background: rgba(245, 89, 89, 0.05);
      }
    }

    &__name {
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-bottom: 6px;
    }

    &__input {
      display: flex;
      align-items: center;
      height: 48px;
      width: 100%;
      padding: 17px 20px;

      background: $white;
      font-size: 14px;

      border: 1px solid #DDDDDD;
      border-radius: 10px;
    }

    &__error {
      width: 100%;
      display: none;
      position: absolute;
      top: 100%;
      left: 0;

      font-size: 12px;
      color: #F55959;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__close {
      position: absolute;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 5;

      width: 15px;
      height: 15px;
      right: 20px;
      bottom: 15px;
    }

    &__closeSvg {
      width: 10px;
      height: 10px;
    }


  }
</style>
