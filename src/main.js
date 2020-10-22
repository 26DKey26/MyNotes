import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import TextareaAutosize from 'vue-textarea-autosize';
import VModal from "vue-js-modal";

Vue.use(VModal, { dynamicDefault: { draggable: false, resizable: false } });
Vue.use(TextareaAutosize);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
