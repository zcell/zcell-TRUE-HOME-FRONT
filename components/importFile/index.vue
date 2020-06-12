<template>
  <form class="importFile"
        :class="{'disabled' : isSending}"
        ref="importFile">
    <template v-if="!isSending">
      <svg-icon class="importFile__svg"
                name=""/>
      <div class="importFile__text">
        Перетащите файл сюда или загрузите для импорта
      </div>
      <input type="file"
             id="fileElem"
             multiple
             @change="handleDrop"
             class="importFile__input"
             accept=".xls, .avi, .mov, .mp4, .doc, .docx, .xls, .odt, .png, .jpeg, .jpg">
      <label for="fileElem" class="addBtn">Выбрать файл</label>
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
        let sendFiles= [];


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
    width: 100%;
    min-height: 300px;

    background: #F6F9FB;
    border: 1px dashed #28A2E1;
    box-sizing: border-box;
    border-radius: 2px;
    transition: all ease .2s;

    &.disabled {
      pointer-events: none;
    }

    &.is-drop {
      background: #E6EBEE;
    }

    &__svg {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;


      &--load {
        animation: loading 1s linear infinite;
      }
    }

    &__text {
      font-size: 22px;
      text-align: center;
      letter-spacing: -0.5px;
      color: #B3B6B8;

      max-width: 314px;
      margin-bottom: 30px;

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
