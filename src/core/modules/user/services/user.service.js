const
  CrudService = require(`${__basedir}/core/services/crud.service`),
  { hashPassword } = require(`${__basedir}/helpers/encryption.helper`)

module.exports = class extends CrudService {
  constructor() {
    super()
    this.table = 'users'
    this.showColumns = ["id, first_name, last_name", "email", "username", "role_id", "created_at", "updated_at", "deleted_at"]
  }

  /*
  *   # Store item to the table
  *
  *   @params Object data
  *   @return Object result
  */
  async store(data) {
    await this.validate(data)

    const tempData = {
      ...data,
      password: hashPassword(data.password)
    }
    const
      fData = this.formatStoreData(tempData),
      sql = `INSERT INTO ${this.table} (${fData.fields}) VALUES ?`,
      result = await this.query(sql, [[fData.values]]),
      added = await this.query(`
        SELECT ${this.showColumns} 
        FROM ${this.table} 
        WHERE id = ? LIMIT 1`, [result.insertId])

    return added[0]
  }

  /*
  *   # Rules
  *
  *   @params Joi     v
  *   @return Object  result
  */
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

  /*
  *   # Dummy random data
  *
  *   @params DummyHelper h
  *   @return Object      result
  */
  async dummy(h) {
    return {
      first_name: h.name(),
      last_name: h.name(),
      username: h.word({ length: '6-10' }),
      password: h.word({ length: '6-10' }),
      email: h.email(),
      role_id: 2
    }
  }
}