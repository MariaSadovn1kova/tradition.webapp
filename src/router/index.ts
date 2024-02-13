import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/ProjectsView.vue'),
    }, 
    {
      path: '/:projectID/objects',
      name: 'objects',
      component: () => import('@/pages/ObjectsView.vue'),
    }, 
    {
      path: '/:projectID/:objectID',
      name: 'object',
      component: () => import('@/pages/ObjectView.vue'),
    }
  ]
})

export default router
