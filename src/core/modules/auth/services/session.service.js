const BaseService = require(`${__basedir}/core/services/base.service`)

module.exports = class extends BaseService {
  constructor() {
    super()
  }

  /*
  *   # Return true
  *
  *   @return Boolean  result
  */
  async invoke() {
    return true
  }
}