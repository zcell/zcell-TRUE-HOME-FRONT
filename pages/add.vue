<template>
  <div class="page">
    <div class="container">
      <div class="page__add center">

        <div class="page__caption">
          Создание публикация
        </div>

        <multiselect :options="options"
                     v-model="type"
                     :allowEmpty="false"
                     class="page__w100 page__mb30"
                     @input=""
                     label="Тип публикации"/>

        <template v-if="type.id !== 40">
          <div class="page__subCaption">
            Видимость публикации:
          </div>
          <div class="page__dfc">
            <radioBtn v-model="visibility"
                      style="margin-right: 20px"
                      class="radio"
                      val="10"
                      name="Видно всем"/>

            <radioBtn v-model="visibility"
                      class="radio"
                      val="20"
                      name="Только мой дом"/>
          </div>
        </template>


        <customInput v-model="title"
                     title="Заголовок"
                     @click="errorForm.clear('title')"
                     :text-error="errorForm.get('title')"
                     @focus="errorForm.clear('title')"
                     placeholder="Введите заголовок"
                     class="page__w100 page__mb30"/>

        <customTextarea v-model="text"
                        title="Текст"
                        @click="errorForm.clear('text')"
                        :text-error="errorForm.get('text')"
                        @focus="errorForm.clear('text')"
                        placeholder="Введите текст"
                        class="page__w100 page__mb30"/>

        <div class="page__line page__mb30" v-if="[10,20].includes(type.id)">
          <dataPicker class="small"
                      format="DD.MM.YY HH:mm"
                      typePicker="dateTime"
                      @changeDate="start_date = $event">
            <slot>Дата начала:</slot>
          </dataPicker>

          <template v-if="type.id === 10">
            <dataPicker class="small"
                        format="DD.MM.YY HH:mm"
                        typePicker="dateTime"
                        v-if="dateEnd"
                        @changeDate="due_date = $event">
              <slot>Дата окончания:</slot>
            </dataPicker>
            <greyBtn v-else
                     @click="dateEnd = true">
              +Добавить дату окончания
            </greyBtn>
          </template>

        </div>

        <multiselect :options="linksFeed"
                     v-model="links"
                     :searchable="true"
                     :close-on-select="false"
                     :options-limit="300"
                     :limit="3"
                     :multiple="true"
                     :max-height="400"
                     :show-no-results="false"
                     :hide-selected="true"
                     @search="asyncFind"
                     :error="errorForm.get('house_id')"
                     @open="errorForm.clear('house_id')"
                     :loading="isSearch"
                     :internal-search="false"
                     :allowEmpty="false"
                     class="page__w100 page__mb30"
                     @input=""
                     label="Связанные публикации"/>

        <template v-if="[10].includes(type.id)">
          <customInput v-for="(item, index) in poll"
                       v-model="item.questions"
                       :key="index + 'variant'"
                       @close="poll.splice(index,1)"
                       :title="'Вариант ответа №' + (index + 1)"
                       placeholder="Текст ответа "
                       :class="{'close' : index + 1 > 2}"
                       class="page__w100 page__mb30 "/>

          <greyBtn class="page__w100 page__mb40"
                   @click="poll.push({questions: ''})">
            +Добавить вариант ответа
          </greyBtn>
        </template>

        <previewFiles :items="files"
                      v-if="files && files.length"
                      @click="deleteFile($event)"/>

        <importFile @import="importFile"
                    class="page__mb30"
                    :is-sending="isSending"/>

        <div class="page__line">
          <customBtn @click="send()"
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
  import Errors from '~/core/Errors'
  import flash from "../mixins/flash";

  export default {
    name: "add",
    middleware: 'auth',
    mixins: [
      flash
    ],
    data() {
      return {
        errorForm: new Errors(),
        files: [],
        poll: [{questions: ''}, {questions: ''}],
        isSending: false,
        dateEnd: false,
        due_date: null,
        start_date: new Date(),
        title: '',
        text: '',
        visibility: 10,
        links: [],
        linksFeed: [],
        isSearch: false,
        type: {
          id: 30,
          name: 'Публичное обращение'
        },
        options: [
          {
            id: 30,
            name: 'Публичное обращение'
          },
          {
            id: 20,
            name: 'Собрания'
          },
          {
            id: 10,
            name: 'Голосование'
          },
          {
            id: 40,
            name: 'Приватное обращение'
          },

        ],
      }
    },

    methods: {

      async asyncFind(e) {
        if (e.length) {
          await this.$axios.get('feed/index?title=' + encodeURIComponent(e))
            .then(res => {
              if (res.data.length) {
                this.linksFeed = res.data.map(x => ({...x, name: x.title}))
              } else {
                this.linksFeed = [];
              }

            })
            .catch(err => console.log(err))
        }

      },

      deleteFile(item) {

        let idx = this.files.findIndex(x => x.filePath === item.filePath);

        if (idx !== -1) {
          this.files.splice(idx, 1)
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
                this.files.push(res.data)
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
      },

      async send() {

        let questionsFormatted = this.poll.map((v) => {
          return v.questions
        });

        let form = {
          title: this.title,
          text: this.text,
          visibility: this.visibility,
          type: this.type.id,
          poll: [{questions: questionsFormatted}],
          due_date: this.due_date ? Math.ceil(this.due_date.getTime() / 1000) : null,
          start_date: this.start_date ? Math.ceil(this.start_date.getTime() / 1000) : null,
          files: this.files.map(file => ({
            name: file.fileName,
            size: file.fileSize,
            type: file.fileType,
            link: file.filePath,
          })),
          links: this.links.map(link => ({link_id:  link.id}))
        }

        await this.$axios.post('feed/create', form)
          .then((response) => {
            this.showFlash({
              name: 'save',
              text: 'Успешно'
            });

            this.$router.push({name: 'index'});


          })
          .catch((error) => {
            error.response && error.response.data.errors ? this.errorForm.record(error.response.data.errors) : this.errorForm.record({});
            this.showFlash({
              name: 'error',
              text: 'Ошибка - проверьте заполненость обязательных полей'
            });
          });
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
