import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'vue3-easy-data-table/dist/style.css';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import i18n from './i18n'


import './assets/main.css'

const app = createApp(App)
i18n.setup()
app.use(i18n.vueI18n)
app.use(VueSidebarMenu)
app.use(router)

app.mount('#app')
