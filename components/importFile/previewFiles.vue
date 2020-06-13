<template>
  <div class="previewFiles">
    <div class="previewFiles__item"
         v-for="(item, index) in items" :key="index + 'file'">

      <img :src="'https://api.home.true-studio.ru' + item.filePath"
           :alt="item.fileName"
           :title="item.fileName"
           v-if="imgFile(item)"
           class="previewFiles__img">

      <div class="previewFiles__file" v-else>
        <svg-icon class="previewFiles__fileSvg"
                  name="doc2"/>
        <div class="previewFiles__fileCaption">
          {{item.fileName}}
        </div>
        <div class="previewFiles__fileSize">
          {{Math.ceil(+item.fileSize / 1024)}} kb
        </div>
      </div>

      <button type="button"
              class="previewFiles__close"
              @click="$emit('click', item)">
        <svg-icon class="previewFiles__svg"
                  name="close"/>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "previewFiles",

    props: {
      items: {
        type: Array,
        default() {
          return []
        }
      }
    },

    methods: {
      imgFile(item) {
        return item.fileType.includes('image')
      }
    }
  }
</script>

<style lang="scss">
  .previewFiles {
    display: flex;
    flex-wrap: wrap;
    margin: 10px -5px 0;
    width: calc(100% + 10px);

    &__item {
      position: relative;
      margin: 0 5px 10px;
      width: calc(25% - 10px);
      height: 110px;

      border: 1px solid #DDDDDD;
      background-color: $greyBlue;
      border-radius: 10px;
      overflow: hidden;
    }

    &__img {
      max-width: none;
      height: 100%;
    }

    &__close {
      position: absolute;
      z-index: 5;
      top: 4px;
      right: 4px;
      width: 24px;
      height: 24px;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: $white;
      border-radius: 50%;
    }

    &__svg {
      width: 7px;
      height: 7px;
      fill: $black;
    }

    &__file {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 12px;
    }

    &__fileSvg {
      width: 18px;
      height: 22px;
      margin-bottom: 20px;
    }

    &__fileCaption {
      font-size: 11px;

      max-height: 26px;
      height: 100%;
      margin-bottom: 6px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
      word-break: break-word;
      line-break: auto;
      -webkit-hyphens: manual;
      -ms-hyphens: manual;
      hyphens: manual;
      overflow: hidden;
    }

    &__fileSize {
      font-size: 11px;
      color: $grey;
    }

  }
</style>
