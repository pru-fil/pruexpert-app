import { createRouter, createWebHistory } from 'vue-router'

import Assessment from "../components/nextgen/Assessment.vue";
import Comments from "../components/nextgen/Comments.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Assessment',
      component: Assessment
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
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
