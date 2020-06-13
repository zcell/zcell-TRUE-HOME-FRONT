import Vue from 'vue'
import btn from '~/components/btn/index'
import customTextarea from '~/components/input/textarea'
import comments from '~/components/feed/comments'
import comment from '~/components/feed/comment'
import voting from '~/components/feed/voting'
import feedFiles from '~/components/feed/files'
import subCaption from '~/components/feed/subCaption'
import actionBtn from '~/components/btn/action'
import avatar from '~/components/avatar/index'
import feed from '~/components/feed/index'
import sideBar from '~/components/sideBar/index'
import importFile from '~/components/importFile/index'
import dropMenu from '~/components/dropMenu/index'
import customSwiper from '~/components/swiper/index'
import imgItem from '~/components/swiper/imgItem'
import postItem from '~/components/swiper/postItem'
import PhotoswipeCustomComponents from "~/components/photoswipe/index";
import countBtn from "../components/btn/countBtn";
import like from "../components/btn/like";
import dislike from "../components/btn/dislike";
import SlideUpDown from 'vue-slide-up-down'
import customInput from '~/components/input/index'
import multiselect from '~/components/multiselect/index'
import modalAuth from '~/components/modals/index'
import scrollToTop from '~/components/scrollToTop/index'
import previewFiles from '~/components/importFile/previewFiles'
import greyBtn from '~/components/btn/grey'
import radioBtn from '~/components/input/radioBtn'
import dataPicker from '~/components/dataPicker/index'

Vue.component('slide-up-down', SlideUpDown);
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
Vue.component('postItem', postItem);
Vue.component('comment', comment);
Vue.component('comments', comments);
Vue.component('dropMenu', dropMenu);
Vue.component('importFile', importFile);
Vue.component('subCaption', subCaption);
Vue.component('sideBar', sideBar);
Vue.component('customInput', customInput);
Vue.component('customTextarea', customTextarea);
Vue.component('multiselect', multiselect);
Vue.component('modalAuth', modalAuth);
Vue.component('scrollToTop', scrollToTop);
Vue.component('previewFiles', previewFiles);
Vue.component('greyBtn', greyBtn);
Vue.component('radioBtn', radioBtn);
Vue.component('dataPicker', dataPicker);
Vue.component('feedFiles', feedFiles);
Vue.component('voting', voting);

