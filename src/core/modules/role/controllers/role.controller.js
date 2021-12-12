const
  CrudController = require(`${__basedir}/core/controllers/crud.controller`),
  RoleService = require('../services/role.service')

module.exports = class extends CrudController {
  constructor() {
    super()
    this.service = new RoleService
  }
}