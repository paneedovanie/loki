const
  BaseController = require(`${__basedir}/core/controllers/base.controller`),
  SessionService = require('../services/session.service')

module.exports = class extends BaseController {
  constructor() {
    super()
    this.service = new SessionService
  }

  invoke(req, res) {
    this.apiResponse(res, async () => {
      return this.service.invoke(req.body)
    }, this.statusCode.OK)
  }
}