import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'


import './assets/main.css'
import router from "@/router";

const app = createApp(App);

//vue-router
app.use(router);

//element-plus
app.use(ElementPlus);

app.mount('#app');
