const
  LoginController = require('../controllers/login.controller'),
  loginController = new LoginController

module.exports = {
  suffix: '/api/v1/',
  routes:
    [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            method: 'post',
            callback: loginController.invoke.bind(loginController)
          }
        ]
      }
    ]
}