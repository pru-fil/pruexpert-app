import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from "../components/layouts/Main.vue";
import HelloWorld from '../components/HelloWorld.vue'
import Courses from "../components/Courses.vue";
import Login from "../components/layouts/Login.vue";
import Sidebar from "../components/layouts/Sidebar.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Sidebar,
      children: [
        {
          path: 'home',
          component: HelloWorld
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/ReportView.vue')
        },
        {
          path: '/users/course/:id',
          name: 'courses',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Courses
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },

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
