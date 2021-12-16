export default {
  path: '*',
  name: 'error',
  redirect: { name: '404' },
  component: () => import('@/components/Layouts/PublicLayout.vue'),
  children: [
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/Pages/MissingPage.vue')
    },
  ],
}