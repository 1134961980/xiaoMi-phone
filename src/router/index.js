import  Vue from 'vue';
import VueRouter from 'vue-router';
import views from "../views";

Vue.use(VueRouter)

var router = new VueRouter({
        routes: [
                { path:"/", redirect:'/home'},
                { path: "/Home", component:views.Home},
                { path: "/Category", component:views.Category},
                { path: "/Profile", component:views.Profile},
                { path: "/Login", component:views.Login},
                { path: "/Details/:id", component:views.Details},
                { path: "/List/:cid", component:views.List},
                { path: "/Cart", component:views.Cart, meta: {needAuth: true}},
                { path: "/Address", component:views.Address, meta: {needAuth: true}},
                { path: "/EditAddress/:id", component:views.EditAddress, meta: {needAuth: true}}
        ]
})

router.beforeEach(function(to, from, next){
        if(to.meta.needAuth && !sessionStorage.getItem("token")){
                next({ path: "/login", query: {to}})
        }else{
                next()
        }
})

export  default  router;