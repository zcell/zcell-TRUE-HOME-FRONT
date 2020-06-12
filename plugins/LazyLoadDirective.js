import Vue from "vue"
import App from "./App"
import LazyLoadDirective from "../directives/lazyLoad"

Vue.config.productionTip = false;

Vue.directive("lazyload", LazyLoadDirective);

new Vue({
   el: "#app",
   components: { App },
   template: "<App/>"
});