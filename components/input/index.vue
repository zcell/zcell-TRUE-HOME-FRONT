<template>
  <div class="input" :class="{'disabled' : disabled , 'is-error' : textError}">
    <div class="input__name" v-if="name !== ''">
      {{name}}
    </div>
    <input :type="type"
           v-if="type !== 'mask'"
           class="input__input"
           placeholder="placeholder"
           :value="value"
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
           placeholder="placeholder"
           @blur="$emit('blur', $event.target.value)"
           @click="$emit('click')"
           @focus="$emit('focus')"
           @input="$emit('input', $event.target.value)"
           :disabled="disabled">

    <div class="input__error">{{ textError }}</div>
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
    }
  }
</script>

<style lang="scss">
  .input {
    position: relative;

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


  }
</style>
