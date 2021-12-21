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
          {
            path: 'getAll',
            callback: roleController.getAll.bind(roleController)
          },
          ...crudRoutes(roleController, "role"),
        ]
      }
    ]
}