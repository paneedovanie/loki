const LoginController = require("../controllers/login.controller"),
  loginController = new LoginController(),
  SessionController = require("../controllers/session.controller"),
  sessionController = new SessionController(),
  SsoController = require("../controllers/sso.controller"),
  ssoController = new SsoController();

module.exports = {
  suffix: "/api/v1/",
  routes: [
    {
      path: "auth",
      children: [
        {
          path: "login",
          method: "post",
          callback: loginController.invoke.bind(loginController),
        },
        {
          path: "session",
          method: "get",
          callback: sessionController.invoke.bind(sessionController),
        },
        {
          path: "sso",
          method: "post",
          callback: ssoController.invoke.bind(ssoController),
        },
      ],
    },
  ],
};
