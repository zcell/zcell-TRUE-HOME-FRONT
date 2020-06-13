<template>
  <div class="page" id="main">
    <div class="container">

      <div class="page__content">
        <div class="page__sideBar">

          <div class="page__sideBarAvatar">

                <span class="page__sideBarAvatarName"
                      v-if="form.avatar === ''">
                       {{ user.first_name[0].toUpperCase()  }}{{ user.last_name[0].toUpperCase()  }}
                </span>

            <img ref="avatarImg"
                 v-else
                 alt="Аватар"
                 :src="'https://api.home.true-studio.ru' + form.avatar"
                 class="page__sideBarAvatarImg">

            <input type="file"
                   id="avatar"
                   @change="loadAvatar"
                   style="display: none"
                   accept=".png, .jpg, .jpeg">

            <label for="avatar"
                   class="page__sideBarAvatarLabel">
              <svg-icon class="page__sideBarAvatarSvg"
                        name="pen"/>
            </label>
          </div>

          <div class="page__sideBarFio">
            Evgenyi Ivanov
          </div>
          <div class="page__sideBarText">
            г Оренбург,
            ул. Салмышская 58/2 кв. 94
          </div>

          <button type="button"
                  :class="{'isActive' : tab === 10}"
                  @click="changeTab(10)"
                  class="page__sideBarBtn">
            <svg-icon class="page__sideBarBtnSvg"
                      name="user"/>
            Мой профиль
          </button>

          <button type="button"
                  :class="{'isActive' : tab === 20}"
                  @click="changeTab(20)"
                  class="page__sideBarBtn">
            <svg-icon class="page__sideBarBtnSvg"
                      name="cart"/>
            Карточка собственника
          </button>

          <button type="button"
                  @click="$auth.logout()"
                  class="page__sideBarBtn">
            <svg-icon class="page__sideBarBtnSvg"
                      name="door"/>
            Выход
          </button>

        </div>

        <div class="page__add">
          <template v-if="tab === 10">
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
          </template>

          <template v-else>
            <div class="page__caption">
              Карточка собственника
            </div>
            <customInput :value="form.last_name"
                         title="Город"
                         class="page__w100 page__mb30 disabled"/>
            <customInput :value="form.middle_name"
                         title="Улица"
                         class="page__w100 page__mb30 disabled"/>
            <customInput :value="form.middle_name"
                         title="Дом"
                         class="page__w100 page__mb30 disabled"/>
            <customInput :value="form.middle_name"
                         title="Квартира"
                         class="page__w100 page__mb30 disabled"/>
            <customInput :value="form.middle_name"
                         title="Кадастровый номер"
                         class="page__w100 page__mb30 disabled"/>

          </template>

        </div>


      </div>
    </div>


  </div>
</template>

<script>

  import Errors from '~/core/Errors'
  import flash from "../mixins/flash";

  export default {
    name: 'account',
    middleware: 'auth',
    components: {},
    mixins: [
      flash
    ],

    mounted() {
        this.form.avatar = this.user.avatar;
        this.form.last_name = this.user.last_name;
        this.form.first_name = this.user.first_name;
        this.form.middle_name = this.user.middle_name;
        this.form.phone = this.user.phone;
    },

    data() {
      return {
        tab: 10,
        form: {
          avatar: '',
          last_name: '',
          first_name: '',
          middle_name: '',
          phone: '',
          password: '',
          repeat_password: ''
        },
        avatar: null,

        errorForm: new Errors(),
        isSending: false,
      }
    },

    computed: {
      loggedIn() {
        return this.$store.getters['loggedIn'];
      },
      user() {
        return this.$store.getters['user'];
      }
    },

    methods: {
      async loadAvatar(e) {

        let dt = (e.dataTransfer || event.target);
        this.avatar = dt.files[0];

        let idxDot = this.avatar.name.lastIndexOf(".") + 1;
        let extFile = this.avatar.name.substr(idxDot).toLowerCase();

        if (this.avatar.size < 9388608 && ["png", "jpg", "jpeg"].includes(extFile)) {
          let reader = new FileReader();
          reader.onload = event => {
            this.$refs.avatarImg.src = event.target.result;
          };
          reader.readAsDataURL(this.avatar);

          let fd = new FormData;
          fd.append('file', this.avatar);

          await this.$axios.post('common/upload', fd)
            .then((res) => {

              this.form.avatar = res.data.filePath;
            })
            .catch((error) => {

              this.showFlash({
                name: 'error',
                text: 'Ошибка - аватар не загружен'
              });
            });
        }
      },

      changeTab(id) {
        if (this.tab !== id) {
          this.tab = id;
        }
      },
    },

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
