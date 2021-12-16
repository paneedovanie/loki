export default [
  {
    path: '',
    name: 'home',
    component: () => import('../views/Home')
  },
  {
    path: '',
    name: 'login',
    component: () => import('../views/Login')
  },
]