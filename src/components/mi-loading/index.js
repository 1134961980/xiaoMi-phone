import Vue from 'vue';

var MiLoadingConstructor = Vue.extend(require("./loading.vue").default);
var  loadingInstance = null;
export default  {
        show() {
                if(loadingInstance) return;
                loadingInstance = new MiLoadingConstructor().$mount();
                document.body.appendChild(loadingInstance.$el);
        },
        close(){
                if(!loadingInstance) return;
                loadingInstance.$destroy();
                loadingInstance.$el.parentNode.removeChild(loadingInstance.$el);
                loadingInstance = null;
        }
}