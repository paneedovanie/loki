export default [
  {
    path: 'users',
    name: 'users',
    component: () => import('../Module'),
    redirect: { name:'users.index'},
    children: [
      {
        path: '',
        name: 'users.index',
        component: () => import('../views/Index'),
        meta: {
          title: 'Manage Users'
        }
      },
      {
        path: 'trashed',
        name: 'users.trashed',
        component: () => import('../views/Trashed'),
        meta: {
          title: 'Trashed Users'
        }
      }
    ]
  },
]