import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from "../components/layouts/Main.vue";
import HelloWorld from '../components/HelloWorld.vue'
import Courses from "../components/Courses.vue";
import Login from "../components/layouts/Login.vue";
import Sidebar from "../components/layouts/Sidebar.vue";
import Trigger from "../components/Trigger.vue";
import LearningPaths from "../components/LearningPaths.vue";
import Reports from "../components/Reports.vue";
import Lbus from "../components/Lbus.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Trigger',
      component: Trigger
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login', '/home', '/about'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//
//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }
//   next();
// })

export default router
