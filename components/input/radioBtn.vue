<template>
    <div class="checkbox">

        <label class="checkbox-box">
            <input type="radio"
                   :value="val"
                   v-model="model"
                   class="checkbox__main">
            <span class="checkbox__custom">
                <svg-icon class="checkbox__svg" name="icon"/></span>
            <span class="checkbox__text">{{ name }}</span>
        </label>


    </div>
</template>

<script>
    export default {
        name: "radioBtn",
        props: ['value', 'name', 'val'],
        data() {
            return {}
        },
        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                },
            },
        }

    }
</script>

<style lang="scss">

</style>