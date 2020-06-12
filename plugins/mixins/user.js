import Vue from 'vue'
import { mapGetters } from 'vuex'

const User = {
    install (Vue, Options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    user: 'authCustom/user',
                    loggedIn: 'authCustom/loggedIn'
                })
            }
        })
    }
}

Vue.use(User);
