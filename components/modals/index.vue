<template>
  <div class="modal__content">

    <template v-if="showTemplate === 'auth'">
      <div class="modal__title">
        Авторизация
      </div>

      <customInput class="modal__input"
                   title="Телефон"
                   type="tel"
                   :mask-active="true"
                   @click="errorForm.clear('phone')"
                   @focus="errorForm.clear('phone')"
                   :text-error="errorForm.get('phone')"
                   :mask="{mask: '+7(999) 999-9999'}"
                   placeholder="+7(999) 999-9999"
                   v-model="auth.phone"/>

      <customInput class="modal__input"
                   title="Пароль"
                   type="password"
                   @click="errorForm.clear('password')"
                   @focus="errorForm.clear('password')"
                   :text-error="errorForm.get('password')"
                   placeholder="Введите пароль"
                   v-model="auth.password"/>



      <customBtn @click="login()" class="modal__btn">
        Войти
      </customBtn>

      <button class="modal__link"
              type="button"
              @click="resetPas()">
        {{resetPassText}}
      </button>

      <button class="modal__link"
              type="button"
              @click="showTemplate = 'reg'">
        Зарегистрироваться
      </button>

      <div class="modal__help">
        <div class="modal__helpTitle">
          Войти с помощью:
        </div>

        <div class="modal__helpServices">
          <button type="button"
                  class="modal__helpService"
                  @click="">
            <svg-icon class="modal__helpSvg"
                      name="gos"/>
          </button>

          <button type="button"
                  class="modal__helpService"
                  @click="">
            <svg-icon class="modal__helpSvg"
                      name="yandex"/>
          </button>
          <button type="button"
                  class="modal__helpService"
                  @click="">
            <svg-icon class="modal__helpSvg"
                      name="vk"/>
          </button>
          <button type="button"
                  class="modal__helpService"
                  @click="">
            <svg-icon class="modal__helpSvg"
                      name="odnoklass"/>
          </button>
          <button type="button"
                  class="modal__helpService"
                  @click="">
            <svg-icon class="modal__helpSvg"
                      name="facebook"/>
          </button>
          <button type="button"
                  class="modal__helpService"
                  @click="">
            <svg-icon class="modal__helpSvg"
                      name="google"/>
          </button>
        </div>
      </div>

    </template>

    <template v-if="showTemplate === 'reg'">
      <div class="modal__title">
        Регистрация
      </div>

      <customInput class="modal__input"
                   title="Имя"
                   @click="errorForm.clear('first_name')"
                   :text-error="errorForm.get('first_name')"
                   @focus="errorForm.clear('first_name')"
                   placeholder="Николай"
                   v-model="reg.first_name"/>

      <customInput class="modal__input"
                   title="Фамилия"
                   @click="errorForm.clear('last_name')"
                   :text-error="errorForm.get('last_name')"
                   @focus="errorForm.clear('last_name')"
                   placeholder="Шуваев"
                   v-model="reg.last_name"/>

      <customInput class="modal__input"
                   title="Телефон"
                   type="tel"
                   @click="errorForm.clear('phone')"
                   :text-error="errorForm.get('phone')"
                   @focus="errorForm.clear('phone')"
                   :mask-active="true"
                   :mask="{mask: '+7(999) 999-9999'}"
                   placeholder="+7(999) 999-9999"
                   v-model="reg.phone"/>




      <customBtn @click="registr()" class="modal__btn">
        Зарегистрироваться
      </customBtn>

      <button class="modal__link"
              type="button"
              @click="showTemplate = 'auth'">
        Авторизация
      </button>
    </template>

    <template v-if="showTemplate === 'sendRegistr'">

      <div class="modal__succes">
        <svg-icon class="modal__succesSvg"
                  name="vector"/>
      </div>

      <div class="modal__title big">
        Спасибо
      </div>

      <div class="modal__title">
        Ваша заявка на регистрацию успешно отправлена
      </div>

      <div class="modal__text">
        После обработки заявки, пароль для доступа будет отправлен на телефон указанный при регистрации
      </div>

      <customBtn @click="$modal.hide('modal__auth')"
                 class="modal__btn">
        ОК
      </customBtn>

    </template>

  </div>


</template>

<script>
  import Errors from '~/core/Errors'

  export default {
    name: "auth",

    data() {
      return {
        auth: {
          phone: '',
          password: ''
        },
        reg: {
          first_name: '',
          last_name: '',
          phone: '',
        },
        showTemplate: 'auth',
        errorForm: new Errors(),
        isSending: false,
        sendReset: false,
      }
    },

    computed: {
      resetPassText() {

        return this.sendReset ? 'Новый пароль отправлен на ваш телефон' : 'Забыли пароль?'
      }
    },

    methods: {
      async login() {
        this.isSending = true;
        await this.$auth.login({
          data: this.auth,
        })
          .then((response) => {
              this.$modal.hide('modal__auth');
          })
          .catch((error) => {
            error.response && error.response.data.errors ? this.errorForm.record(error.response.data.errors) : this.errorForm.record({});
          });
        this.isSending = false;
      },

      async registr() {
        this.isSending = true;
        await this.$axios.post('auth/register', this.reg)
          .then(async (response) => {
            this.showTemplate = 'sendRegistr';

          })
          .catch((error) => {
            error.response && error.response.data.errors ? this.errorForm.record(error.response.data.errors) : this.errorForm.record({});
          });
        this.isSending = false;
      },

      async resetPas() {
        this.isSending = true;
        await this.$axios.post('auth/restore-password', this.auth)
          .then((response) => {
            this.sendReset = true;
          })
          .catch((error) => {
            console.log(error);
            error.response && error.response.data.errors ? this.errorForm.record(error.response.data.errors) : this.errorForm.record({});
          });
        this.isSending = false;
      },

    }
  }
</script>

<style lang="scss">

</style>
