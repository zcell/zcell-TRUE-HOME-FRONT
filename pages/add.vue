<template>
  <div class="page">
    <div class="container">
      <div class="page__add center">

        <div class="page__caption">
          Создание публикация
        </div>

        <multiselect :options="options"
                     v-model="selected"
                     :allowEmpty="false"
                     class="page__w100 page__mb30"
                     @input=""
                     label="Тип публикации"/>

        <div class="page__subCaption">
          Видимость публикации:
        </div>
        <div class="page__dfc" >
          <radioBtn v-model="show"
                    style="margin-right: 20px"
                    class="radio"
                    val="10"
                    name="Видно всем"/>

          <radioBtn v-model="show"
                    class="radio"
                    val="20"
                    name="Только мой дом"/>
        </div>

        <customInput v-model="title"
                     title="Заголовок"
                     placeholder="Введите заголовок"
                     class="page__w100 page__mb30"/>

        <customTextarea v-model="text"
                        title="Текст"
                        placeholder="Введите текст"
                        class="page__w100 page__mb30"/>

        <div class="page__line page__mb30">
          <dataPicker class="small"
                      format="DD.MM.YY HH:mm"
                      typePicker="dateTime"
                      @changeDate="">
            <slot>Дата начала:</slot>
          </dataPicker>

          <dataPicker class="small"
                      format="DD.MM.YY HH:mm"
                      typePicker="dateTime"
                      v-if="dateEnd"
                      @changeDate="">
            <slot>Дата окончания:</slot>
          </dataPicker>
          <greyBtn v-else
                   @click="dateEnd = true">
            +Добавить дату окончания
          </greyBtn>
        </div>

        <template v-if="">
          <customInput v-for="(item, index) in variants"
                       v-model="item.text"
                       :key="index + 'variant'"
                       @close="variants.splice(index,1)"
                       :title="'Вариант ответа №' + (index + 1)"
                       placeholder="Текст ответа "
                       :class="{'close' : index + 1 > 2}"
                       class="page__w100 page__mb30 "/>

          <greyBtn  class="page__w100 page__mb40"
            @click="variants.push({text: ''})">
            +Добавить вариант ответа
          </greyBtn>
        </template>

        <previewFiles :items="loadFiles"
                      v-if="loadFiles && loadFiles.length"
                      @click="deleteFile($event)"/>

        <importFile @import="importFile"
                    class="page__mb30"
                    :is-sending="isSending"/>

        <div class="page__line">
          <customBtn @click=""
                     class="">
            Отправить
          </customBtn>
          <greyBtn @click="$router.push({name: 'index'})">
             Отменить
          </greyBtn>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "add",
    middleware: 'auth',

    data() {
      return {
        loadFiles: [],
        variants: [{text: ''},{text: ''}],
        isSending: false,
        dateEnd: false,
        title: '',
        text: '',
        show: 10,
        selected: {
          id: 1,
          name: 'Публичное обращение'
        },
        options: [
          {
            id: 1,
            name: 'Публичное обращение'
          },
          {
            id: 2,
            name: 'Голосование'
          },
          {
            id: 3,
            name: 'Собрания'
          }
        ],
      }
    },

    methods: {

      deleteFile(item) {

          let idx = this.loadFiles.findIndex(x => x.filePath === item.filePath);

          if (idx !== -1) {
            this.loadFiles.splice(idx,1)
          }
      },

      async importFile(files) {
        let promiseList = [];

        this.isSending = true;
        files.forEach(file => {
          let formData = new FormData;
          formData.append('file', file);

          const sendMethod = async () => {
            await this.$axios.post('common/upload', formData)
              .then(res => {
                  this.loadFiles.push(res.data)
              })
              .catch(error => console.log(error));
          };

          promiseList.push(sendMethod());
        })
        // this.isSending = true;
        await Promise.all(promiseList)
          .then((response) => {
            console.log(response)
            this.isSending = false;
          })
          .catch(error => console.log(error));

        // this.isSending = false;
      }

    },

    head() {
      return {
        title: 'Добавление публикации',
        meta: [
          {hid: 'description', name: 'description', content: ''},
          {name: 'og:type', content: 'website'},
        ],
      }
    },
  }
</script>

<style lang="scss">

</style>
