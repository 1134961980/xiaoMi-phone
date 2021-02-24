//main.js是vue项目运行的入口文件
//main.js主要是创建vue的根实例，并渲染到挂载点
//ES6导入
import Vue from "vue";
import router from "./router";
import "./assets/css/reset.css";
import "./assets/fonts/iconfont.css";
import http from "./utils/http";
import miAlert from './components/mi-alert';
import miNotice from  "./components/mi-notice";
import  miConfirm from "./components/mi-confirm";
import  miLoading from "./components/mi-loading";
import axios from 'axios'

Vue.prototype.$http= http;
Vue.prototype.$axios=axios,
Vue.prototype.$alert = miAlert;
Vue.prototype.$notice = miNotice;
Vue.prototype.$confirm = miConfirm;
Vue.prototype.$loading = miLoading;
new Vue({
        el: "#app",
        template: "<router-view></router-view>",
        router
})