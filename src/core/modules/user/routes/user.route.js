const
  UserController = require('../controllers/user.controller'),
  userController = new UserController,
  { crudRoutes } = require(`${__basedir}/helpers/route.helper`)

module.exports = {
  suffix: '/api/v1/',
  routes:
    [
      {
        path: 'users',
        children: [
          ...crudRoutes(userController, "user"),
        ]
      }
    ]
}