const
  CrudController = require(`${__basedir}/core/controllers/crud.controller`),
  RoleService = require('../services/role.service')

module.exports = class extends CrudController {
  constructor() {
    super()
    this.service = new RoleService
  }

  getAll(req, res, next) {
    this.apiResponse(res, async () => {
      return this.service.getAll()
    }, this.statusCode.OK)
  }
}