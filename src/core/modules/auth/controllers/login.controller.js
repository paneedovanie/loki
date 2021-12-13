const
  BaseController = require(`${__basedir}/core/controllers/base.controller`),
  LoginService = require('../services/login.service')

module.exports = class extends BaseController {
  constructor() {
    super()
    this.service = new LoginService
  }

  invoke(req, res) {
    this.apiResponse(res, async () => {
      return this.service.invoke(req.body)
    }, this.statusCode.OK)
  }
}