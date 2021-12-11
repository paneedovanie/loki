const
  CrudController = require(`${__basedir}/core/controllers/crud.controller`),
  UserService = require('../services/user.service')

module.exports = class extends CrudController {
  constructor() {
    super()
    this.service = new UserService
  }
}