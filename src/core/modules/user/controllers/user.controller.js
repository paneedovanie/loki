const
  CrudController = require(`${__basedir}/core/controllers/crud.controller`),
  UserService = require('../services/user.service'),
  UserResource = require(`../resources/user.resource`)

module.exports = class extends CrudController {
  constructor() {
    super()
    this.service = new UserService
  }

  async index(req, res) {
    this.apiResponse(res, async () => {
      let result = await this.service.index(req.query)

      result.data = await new UserResource(result.data)

      return result
    }, this.statusCode.OK)
  }

  async trashed(req, res) {
    this.apiResponse(res, async () => {
      let result = await this.service.trashed(req.query)

      result.data = await new UserResource(result.data)

      return result
    }, this.statusCode.OK)
  }
}