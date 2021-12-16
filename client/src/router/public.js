// import Auth from '@/core/models/Auth'

let routes = []

const requireRoute = require.context(
  // The relative path of the components folder
  '@/modules/',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /routes\/public\.js$/
)

requireRoute.keys().forEach(fileName => {
  const routeConfig = requireRoute(fileName)
  routes = [...routes, ...routeConfig.default]
})

export default {
  path: '/',
  name: 'public',
  redirect: { name: 'home' },
  children: routes,
  component: () => import('@/components/Layouts/PublicLayout.vue'),
  // beforeEnter: ( to, from, next ) => {
  //   const auth = new Auth
  //   if( auth.isAuthenticated() ) next({ name: 'dashboard' })
  //   next()
  // }
}