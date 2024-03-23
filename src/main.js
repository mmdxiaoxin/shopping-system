import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'


import './styles/main.css'
import router from "@/router";
import store from "@/stores";

const app = createApp(App);

//vue-router
app.use(router);

//element-plus
app.use(ElementPlus);

//vuex
app.use(store);

//element-plus-icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');
