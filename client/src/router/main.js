import store from '../store'

let routes = []

const requireRoute = require.context(
  // The relative path of the components folder
  '@/modules/',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /routes\/main\.js$/
)

requireRoute.keys().forEach(fileName => {
  const routeConfig = requireRoute(fileName)
  routes = [...routes, ...routeConfig.default]
})

export default {
  path: '/main',
  name: 'main',
  redirect: { name: 'dashboard' },
  children: routes,
  component: () => import('@/components/Layouts/MainLayout.vue'),
  beforeEnter: async (to, from, next) => {
    const auth = store.getters["auth/auth"]

    if (!store.getters['auth/isAuthenticated'])
      return next({ name: 'public' })

    const permissions = auth.user.role.permissions

    if (
      to.meta.permission &&
      !permissions.includes(to.meta.permission)
    ) return next({ name: 'dashboard' })

    next()
  }
}