import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'mdb-vue-ui-kit/css/mdb.min.css';


import './assets/main.css'

const app = createApp(App)
app.use(VueSidebarMenu)
app.use(router)

app.mount('#app')
