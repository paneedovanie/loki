const
  RoleController = require('../controllers/role.controller'),
  roleController = new RoleController,
  { crudRoutes } = require(`${__basedir}/helpers/route.helper`)

module.exports = {
  suffix: '/api/v1/',
  routes:
    [
      {
        path: 'roles',
        children: [
          ...crudRoutes(roleController, "role"),
        ]
      }
    ]
}