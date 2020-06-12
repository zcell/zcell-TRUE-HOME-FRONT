<template>
    <div class="checkbox">
        <template v-if="multiCheckbox">
            <label class="checkbox-box" v-for="(item, index) in items">
                <input type="checkbox"
                       v-model="checkboxValue"
                       :value="item.id"
                       @change="$emit('input', checkboxValue)"
                       class="checkbox__main">
                <span class="checkbox__custom">
                <svg-icon class="checkbox__svg" name="icon"/></span>
                <span class="checkbox__text">{{ item.name }}</span>
            </label>
        </template>
        <template v-else>
            <label class="checkbox-box" >
                <input type="checkbox"
                       v-model="checkboxValue.active"
                       :value="checkboxOne.active"
                       @change="$emit('input', checkboxValue.active)"
                       class="checkbox__main">
                <span class="checkbox__custom">
                <svg-icon class="checkbox__svg" name="icon"/></span>
                <span class="checkbox__text">{{ checkboxOne.name }}</span>
            </label>
        </template>


    </div>
</template>

<script>
    export default {
        name: "checkbox",
        props: {
            value: Array,
            multiCheckbox: {
                type: Boolean,
                default() {
                    return false
                }
            },
            checkboxOne: {
              type: Object,
              default() {
                  return {}
              }
            },
            items: {
                type: Array,
                default() {
                    return [
                        {
                            name: 'Чекбокс 1',
                            id: 1
                        },
                        {
                            name: 'Чекбокс 2',
                            id: 2
                        },
                        {
                            name: 'Чекбокс 3',
                            id: 3
                        },
                    ]
                }
            }
        },
        data() {
            return {
                checkboxValue: this.multiCheckbox ? this.value : this.checkboxOne,
            }
        },
        watch: {
            value() {
                this.checkboxValue = this.value;
            },
            checkboxOne() {
                this.checkboxValue = this.checkboxOne;
            },
        }
    }
</script>

<style lang="scss">

</style>