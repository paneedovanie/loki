const CrudService = require(`${__basedir}/core/services/crud.service`)

module.exports = class extends CrudService {
  constructor() {
    super()
    this.table = 'users'
  }

  rules(v) {
    return {
      first_name: v.string().required().max(255),
      last_name: v.string().required(),
      email: v.string().email().required().max(255),
    }
  }
}