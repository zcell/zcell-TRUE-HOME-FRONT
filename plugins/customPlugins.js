import Vue from 'vue'
import btn from '~/components/btn/index'
import actionBtn from '~/components/btn/action'
import avatar from '~/components/avatar/index'
import feed from '~/components/feed/index'
import customSwiper from '~/components/swiper/index'
import imgItem from '~/components/swiper/imgItem'
import PhotoswipeCustomComponents from "~/components/photoswipe/index";
import countBtn from "../components/btn/countBtn";
import like from "../components/btn/like";
import dislike from "../components/btn/dislike";

Vue.component('customBtn', btn);
Vue.component('avatar', avatar);
Vue.component('actionBtn', actionBtn);
Vue.component('feed', feed);
Vue.component('customSwiper', customSwiper);
Vue.component('imgItem', imgItem);
Vue.component('PhotoswipeCustomComponents', PhotoswipeCustomComponents);
Vue.component('countBtn', countBtn);
Vue.component('dislike', dislike);
Vue.component('like', like);

