<template>
  <div class="page" id="main">
    <div class="container">

      <div class="page__content">
        <div class="page__sideBar">
          <avatar class="page__sideBarAvatar"/>
          <div class="page__sideBarFio">
            Evgenyi Ivanov
          </div>
          <div class="page__sideBarText">
            г Оренбург,
            ул. Салмышская 58/2 кв. 94
          </div>

          <button type="button"
                  @click=""
                  class="page__sideBarMenu">

          </button>

        </div>

        <div class="page__add">
          <div class="page__caption">
            Мой профиль
          </div>

          <customInput v-model="form.last_name"
                       @click="errorForm.clear('last_name')"
                       :text-error="errorForm.get('last_name')"
                       @focus="errorForm.clear('last_name')"
                       title="Фамилия"
                       placeholder="Введите фамилию"
                       class="page__w100 page__mb30"/>

          <customInput v-model="form.last_name"
                       @click="errorForm.clear('last_name')"
                       :text-error="errorForm.get('last_name')"
                       @focus="errorForm.clear('last_name')"
                       title="Имя"
                       placeholder="Введите имя"
                       class="page__w100 page__mb30"/>

          <customInput v-model="form.middle_name"
                       @click="errorForm.clear('middle_name')"
                       :text-error="errorForm.get('middle_name')"
                       @focus="errorForm.clear('middle_name')"
                       title="Отчество"
                       placeholder="Введите отчество"
                       class="page__w100 page__mb30"/>


          <customInput class="page__w100 page__mb30"
                       title="Телефон"
                       type="tel"
                       @click="errorForm.clear('phone')"
                       :text-error="errorForm.get('phone')"
                       @focus="errorForm.clear('phone')"
                       :mask-active="true"
                       :mask="{mask: '+7(999) 999-9999'}"
                       placeholder="+7(999) 999-9999"
                       v-model="form.phone"/>

          <customInput v-model="form.password"
                       type="password"
                       @click="errorForm.clear('password')"
                       :text-error="errorForm.get('password')"
                       @focus="errorForm.clear('password')"
                       title="Пароль"
                       placeholder="Введите пароль"
                       class="page__w100 page__mb30"/>

          <customInput v-model="form.repeat_password"
                       type="password"
                       @click="errorForm.clear('repeat_password')"
                       :text-error="errorForm.get('repeat_password')"
                       @focus="errorForm.clear('repeat_password')"
                       title="Повторите пароль"
                       placeholder="Повторите пароль"
                       class="page__w100 page__mb30"/>

          <customBtn @click=""
                     class="">
            Сохранить
          </customBtn>
        </div>


      </div>
    </div>


  </div>
</template>

<script>

  import Errors from '~/core/Errors'

  export default {
    name: 'account',
    middleware: 'auth',
    components: {},

    data() {
      return {
        form: {
          last_name: '',
          first_name: '',
          middle_name: '',
          phone: '',
          password: '',
          repeat_password: ''
        },
        errorForm: new Errors(),
        isSending: false,
      }
    },

    methods: {},

    head() {
      return {
        title: 'Аккаунт',
        meta: [
          {hid: 'description', name: 'description', content: ''},
          {name: 'og:type', content: 'website'},
        ],
      }
    },
  }
</script>

<style>

</style>
