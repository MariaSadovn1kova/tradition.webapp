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
      path: '/project/:projectID',
      name: 'project',
      component: () => import('@/pages/ProjectView.vue'),
    }, 
    {
      path: '/project/:projectID/:objectID',
      name: 'object',
      component: () => import('@/pages/object-view/ObjectView.vue'),
    },
    {
      path: '/last-transaction',
      name: 'last-transaction',
      component: () => import('@/pages/LastTransaction.vue'),
    },
    {
      path: '/create',
      name: 'create',
      children: [
        {
          path: 'project',
          name: 'create-project',
          component: () => import('@/pages/CreateProject.vue'),
        },
        {
          path: 'object',
          name: 'create-object',
          component: () => import('@/pages/CreateObject.vue'),
        },
        {
          path: 'transaction',
          name: 'create-transaction',
          component: () => import('@/pages/CreateTransaction.vue'),
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    }
  ]
})

export default router
