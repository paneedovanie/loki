const
  CrudService = require(`${__basedir}/core/services/crud.service`),
  { hash } = require(`${__basedir}/helpers/encryption.helper`)

module.exports = class extends CrudService {
  constructor() {
    super()
    this.table = 'users'
  }

  /*
  *   # Store item to the table
  *
  *   @params Object data
  *   @return Object result
  */
  async store(data) {
    await this.validate(data)

    data.password = hash("sha256", data.password)

    const
      fData = this.formatStoreData(data),
      sql = `INSERT INTO ${this.table} (${fData.fields}) VALUES ?`;

    return this.query(sql, [[fData.values]])
  }

  rules(v) {
    return {
      first_name: v.string().required().max(255),
      last_name: v.string().required().max(255),
      username: v.string().required().max(255),
      password: v.string().required().max(255),
      email: v.string().email().required().max(255),
      role_id: v.number().required()
    }
  }
}