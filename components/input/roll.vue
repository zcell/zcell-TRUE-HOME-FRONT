<template>
    <label class="roll" :class="{'is-active' : value}">
        <input class="roll__input"
               type="checkbox"
               :checked="value"
               :disabled="disabled"
               @change="input($event.target.checked)">
        <span class="roll__custom"></span>

    </label>
</template>

<script>
    export default {
        name: "roll",
        props: {
            value: Boolean,
            disabled: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },

        methods: {
            input(checked) {
                if (!this.$attrs.disabled) {
                    this.$emit('input', checked)
                }
            }
        },
    }
</script>

<style lang="scss">
    .roll {
        position: relative;
        display: block;
        width: 42px;
        height: 20px;
        cursor: pointer;
        transition: all ease .2s;

        background: #B3B6B8;
        border-radius: 15px;

        &.is-active {
            background: #28A2E1;

            .roll__custom {
                transform: translate(calc(150% + 1px),-50%);

            }
        }

        &__custom {
            position: absolute;
            background-color: white;
            width: 15px;
            height: 15px;
            top: 50%;
            transform: translate(calc(30% - 1px),-50%);
            border-radius: 50%;
            transition: all ease .2s;
        }

        &__input {
            display: none;
        }
    }
</style>