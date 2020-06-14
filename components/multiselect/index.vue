<template>
  <div class="multiselectWrapper"
       :class="{'isError': error}">
    <template v-if="label">
            <span class="multiselectWrapper__label">
                {{label}}
            </span>
    </template>

    <vue-multiselect class="multiselectWrapper__multiselect"
                     :value="value"
                     :options="options"
                     :searchable="searchable"
                     track-by="id"
                     :show-labels="false"
                     v-on="$listeners"
                     @search-change="$emit('search', $event)"
                     v-bind="$attrs"
                     :allow-empty="allowEmpty"
                     :placeholder="placeholder"
                     :close-on-select="!multiple"
                     :multiple="multiple">

      <template slot="singleLabel"
                slot-scope="props">
        {{props.option.name}}
      </template>
      <template slot="noOptions">
        Значений нет
      </template>

      <template slot="option" slot-scope="props">
        {{props.option.name}}
      </template>

      <template slot="selection"
                slot-scope="{ values }">
        <template v-for="item in values">
          <span class="multiselect__tagsItem">{{item.name}}</span>
        </template>
      </template>


      <template slot="caret">
        <div class="multiselect__caret">
          <svg-icon class="multiselect__caretSvg" name="arrow-bottom"/>
        </div>
      </template>

    </vue-multiselect>

    <span class="multiselectWrapper__error" v-if="error">
            {{ error }}
        </span>
  </div>
</template>

<script>
  //  import SvgIcon from '../svgIcon/index'
  //  import VueMultiselect from 'vue-multiselect'

  export default {
    name: "Multiselect",

    components: {},
    props: {
      value: {},
      options: {
        default: null,
        type: Array,
        required: true,
      },
      placeholder: {
        default: 'Не выбрано',
        type: String
      },
      label: {
        default: null,
      },
      allowEmpty: {
        type: Boolean,
        default() {
          return true
        }
      },
      searchable: {
        type: Boolean,
        default() {
          return false
        }
      },
      multiple: {
        default: false,
        type: Boolean
      },
      error: {
        default: null,
      }
    },


  }
</script>
