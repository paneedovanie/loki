const CrudService = require(`${__basedir}/core/services/crud.service`)

module.exports = class extends CrudService {
  constructor() {
    super()
    this.table = 'roles'
  }

  rules(v) {
    return {
      title: v.string().required().max(255),
      slug: v.string().required(),
      description: v.string().max(255),
    }
  }
}