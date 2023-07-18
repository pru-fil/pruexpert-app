import { createRouter, createWebHistory } from 'vue-router'

import Assessment from "../components/nextgen/Assessment.vue";
import Comments from "../components/nextgen/Comments.vue";
import i18n from '../i18n'
import DigitalTrigger from "../components/DigitalTrigger.vue";

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
    },
    {
      path: '/demo',
      name: 'Demo',
      component: DigitalTrigger
    }
  ]
})

router.beforeEach((to, from) => {
  const newLocale = to.query.type
  const prevLocale = from.query.type
  // If the locale hasn't changed, do nothing
  if (newLocale === prevLocale) {
    return
  }
  i18n.setLocale(newLocale)
})

export default router
