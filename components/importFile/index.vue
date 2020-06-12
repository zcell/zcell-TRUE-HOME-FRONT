<template>
  <form class="importFile"
        :class="{'disabled' : isSending}"
        ref="importFile">
    <template v-if="!isSending">

      <div class="importFile__text">
        <svg-icon class="importFile__svg "
                  name="import"/>
        Перетащите файл сюда или &nbsp;
        <label for="fileElem" class="importFile__label"> выберите файл</label>
      </div>

      <input type="file"
             id="fileElem"
             multiple
             @change="handleDrop"
             class="importFile__input"
             accept=".xls, .avi, .mov, .mp4, .doc, .docx, .xls, .odt, .png, .jpeg, .jpg">

    </template>
    <template v-else>
      <svg-icon class="importFile__svg importFile__svg--load"
                name="loading"/>
      <div class="importFile__text importFile__text--big">
        Загрузка файлов
      </div>
    </template>
  </form>
</template>

<script>

  export default {

    name: "importFile",
    components: {},
    mixins: [],
    props: ['isSending'],
    mounted() {
      let dropArea = this.$refs.importFile;

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
      })
      ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
      });

      dropArea.addEventListener('drop', this.handleDrop, false);


      function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      function highlight(e) {
        dropArea.classList.add('is-drop');
      }

      function unhighlight(e) {
        dropArea.classList.remove('is-drop')
      }
    },
    data() {
      return {

        files: false,
      }
    },
    methods: {
      async handleDrop(e) {

        let dt = (e.dataTransfer || event.target);
        let files = dt.files;
        let sendFiles = [];


        Array.prototype.forEach.call(files, file => {
          let idxDot = file.name.lastIndexOf(".") + 1;
          let extFile = file.name.substr(idxDot).toLowerCase();

          if (file.size < 59388608 && ["xls", "avi", "mov", "mp4", "doc", "docx", "xls", "odt", "png", "jpeg", "jpg"].includes(extFile)) {
            sendFiles.push(file)
          }
        })

        this.$emit('import', sendFiles);


      }
    }
  }
</script>

<style lang="scss">
  .importFile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    min-height: 96px;
    min-width: 450px;
    width: 100%;
    max-width: 500px;

    background: $white;
    box-sizing: border-box;
    transition: all ease .2s;

    border: 2px dashed #DDDDDD;
    border-radius: 10px;

    &.disabled {
      pointer-events: none;
    }

    &.is-drop {
      background: #E6EBEE;
    }

    &__svg {
      width: 20px;
      height: 18px;
      margin-right: 20px;


      &--load {
        animation: loading 1s linear infinite;
      }
    }

    &__label {
      color: $primaryColor;
      font-weight: 600;
      cursor: pointer;
    }

    &__text {
      display: flex;
      align-items: center;

      font-weight: 600;
      text-align: center;
      letter-spacing: -0.5px;
      color: #B3B6B8;


      &--big {
        margin-bottom: 0;

        font-size: 22px;
        text-align: center;
        letter-spacing: -0.5px;
        color: #323C47;
      }

    }

    &__input {
      display: none;
    }
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
