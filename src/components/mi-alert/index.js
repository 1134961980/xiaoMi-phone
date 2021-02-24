import Vue from "vue";

var MiAlertConstructor = Vue.extend(require("./alert.vue").default)
export  default  function(text){
        var instance = new MiAlertConstructor({data: { text  }}).$mount();
        document.body.appendChild(instance.$el)
}