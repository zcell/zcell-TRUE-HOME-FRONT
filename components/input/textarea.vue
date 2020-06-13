<template>
  <div class="textarea" :class="{'disabled' : disabled, 'is-error' : textError}">
    <div class="textarea__name" v-if="title != ''">
      {{title}}
    </div>
    <textarea class="textarea__textarea"
              :value="value"
              @input="$emit('input', $event.target.value)"
              @click="$emit('click')"
              :placeholder="placeholder"
              v-autosize
              rows="5">
            </textarea>
    <div class="textarea__error">{{ textError }}</div>
  </div>
</template>

<script>
  export default {
    name: "textareaCustom",
    props: {
      value: {},
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
          return '';
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
    }
  }
</script>

<style lang="scss">
  .textarea {
    position: relative;

    &.is-error {
      .textarea__error {
        display: block;
      }

      .textarea__textarea {
        border: 1px solid #F55959;
        background: rgba(245, 89, 89, 0.05);
      }
    }

    &.disabled {
      .textarea__textarea {
        pointer-events: none;
        background-color: #F6F8F9;
        resize: none;
      }
    }

    &__textarea {
      width: 100%;
      padding: 17px 20px;
      max-width: 1000px;
      min-width: 220px;
      font-size: 14px;
      font-family: $mainFonts;
      resize: none;
      background: $white;

      border: 1px solid #DDDDDD;
      border-radius: 10px;
    }

    &__name {
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-bottom: 6px;
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
