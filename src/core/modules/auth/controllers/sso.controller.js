const BaseController = require(`${__basedir}/core/controllers/base.controller`),
  SsoService = require("../services/sso.service");

module.exports = class extends BaseController {
  constructor() {
    super();
    this.service = new SsoService();
  }

  invoke(req, res) {
    console.log('sso')
    this.apiResponse(
      res,
      async () => {
        return this.service.invoke(req.body);
      },
      this.statusCode.OK
    );
  }
};
