const 
  BaseResource = require(`${__basedir}/core/resources/base.resource`),
  UserService = require(`../services/user.service`)

module.exports = class extends BaseResource {
  constructor(data) {
    super(data)
  }

  async modify(data) {
    const userService = new UserService

    return {
      ...data,
      display_name: data.first_name + " " + data.last_name,
      role: await userService.getRole(data.role_id)
    }
  }
}