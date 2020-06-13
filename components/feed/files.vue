<template>
  <div class="feedFiles">
    <div class="feedFiles__caption">
      Прикрепленные файлы
    </div>
    <div class="feedFiles__files">
      <div class="feedFiles__file"
           v-for="file in files"
           :key="file.id">

        <svg-icon class="feedFiles__svg"
                  name="doc2"/>

        <div class="feedFiles__name">
          {{file.name}}
        </div>

        <div class="feedFiles__size">
          {{Math.ceil(file.size / 1024)}} kb
        </div>

        <actionBtn svg="download"
                   @click="download(file)"
                   class="feedFiles__action"/>
      </div>
    </div>
    <a href="" download="" style="display: none" ref="loadFile"></a>
  </div>
</template>

<script>
  export default {
    name: "feedFiles",
    props: {
      files: {
        type: Array,
        default() {
          return []
        }
      }
    },

    methods: {
      download(file) {
        this.$refs.loadFile.setAttribute('download', `${file.name}`);
        this.$refs.loadFile.href = 'https://api.home.true-studio.ru' + file.link;
        this.$refs.loadFile.click();
      }
    }
  }
</script>

<style lang="scss">
  .feedFiles {
    display: flex;
    width: 100%;
    flex-direction: column;

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background: #DDDDDD;
      margin-bottom: 30px;
    }

    &__caption {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    &__files {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-bottom: 30px;
    }

    &__file {
      display: flex;
      align-items: center;
    }

    &__svg {
      width: 18px;
      height: 22px;
      margin-right: 20px;
    }

    &__name {
      max-width: 300px;
      overflow: hidden;
      color: $primaryColor;
    }

    &__size {
      margin-left: auto;
      margin-right: 20px;
      color: $grey;
    }
  }
</style>
