<template>
  <div class="datePicker" :class="{'isDisabled': disabled}">
    <div class="datePicker__name" v-if="activeLabel">
      <slot></slot>
    </div>
    <client-only>
      <date-picker v-model="date"
                   lang="ru"
                   :type="typePicker"
                   :editable="false"
                   placeholder=""
                   :disabled="disabled"
                   @input="changeDate()"
                   @focus="$emit('focusDate')"
                   @change="$emit('focusDate')"
                   :first-day-of-week=1
                   :range="range"
                   :format='format'>
        <template v-slot:calendar-icon>
          <svg-icon class="datePicker__icon"
                    name="date"/>
        </template>
      </date-picker>

    </client-only>
    <div class="input__error">{{ textError }}</div>
  </div>

</template>

<script>
  import DatePicker from '~/mixins/datePicker'

  export default {
    name: "dataPicker",
    mixins: {
      DatePicker
    },
    props: {
      typePicker: {
        type: String,
        default() {
          return 'date'
        }
      },
      activeLabel: {
        type: Boolean,
        default() {
          return true
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      format: {
        type: String,
        default() {
          return 'DD.MM.YY'
        }
      },
      textError: {
        type: String,
        default() {
          return 'Ошибка'
        }
      },
      dateMain: {
        default() {
          return new Date();
        }
      },
      range: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        date: this.dateMain,
      }
    },
    methods: {
      changeDate() {
        this.$emit('changeDate', this.date);
      }
    },
    watch: {
      dateMain() {
        this.date = this.dateMain
      }
    }
  }
</script>

<style lang="scss">
  .datePicker {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 240px;

    &.is-error {
      .input__error {
        display: block;
      }

      .mx-input {
        border: 1px solid #F55959;
        background: rgba(245, 89, 89, 0.05);
      }
    }

    &.isDisabled {
      .mx-input {
        background-color: #F6F8F9;
      }
    }

    &__name {
      margin-bottom: 6px;
      font-weight: 600;
    }

    .mx-datepicker {
      width: 100%;


    }

    .mx-input-append {

      right: 10px;


    }

    .mx-input {
      width: 100%;
      height: 48px;
      background: $white;

      padding-left: 20px;

      font-size: 14px;
      font-weight: 400;
      color: #43505F;
      box-shadow: none;

      border: 1px solid #DDDDDD;
      border-radius: 10px;
    }

    &__icon {
      width: 16px;
      height: 35px;
    }

    .mx-panel-date {
      tbody {
        td {
          background-color: white !important;

          &:hover {
            background-color: #eaf8fe !important;
          }
        }
      }
    }

  }
</style>
