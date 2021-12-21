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
  *   # Return paginated items on the table
  *
  *   @return array result
  */
  index(options) {
    options.where = `deleted_at IS NULL` 

    if(options.search)
      options.where += `&& (
        CONCAT(first_name, ' ', last_name) LIKE '%${options.search}%' ||
        first_name LIKE '%${options.search}%' ||
        last_name LIKE '%${options.search}%'
      )`

    if(options.sortBy) {
      let field = ''

      switch(options.sortBy[0]) {
        case 'display_name':
          field = 'first_name'
          break
        case 'role.title':
          field = 'role_id'
          break
        default:
          field = options.sortBy[0]
      }

      options.where += ` ORDER BY ${field} ${JSON.parse(options.sortDesc[0])? 'DESC' : ''}`
    }

    return this.paginate(options)
  }

  /*
  *   # Return paginated trashed items on the table
  *
  *   @return array result
  */
  trashed(options) {
    options.where = `deleted_at IS NOT NULL`

    if(options.search)
      options.where += ` && (
        CONCAT(first_name, ' ', last_name) LIKE '%${options.search}%' ||
        first_name LIKE '%${options.search}%' ||
        last_name LIKE '%${options.search}%'
      )`

    if(options.sortBy[0]) {
      let field = ''

      switch(options.sortBy[0]) {
        case 'display_name':
          field = 'first_name'
          break
        case 'role.title':
          field = 'role_id'
          break
        default:
          field = options.sortBy[0]
      }

      options.where += ` && ORDER BY ${field} ${JSON.parse(options.sortDesc[0]) ? 'DESC' : ''}`
    }

    return this.paginate(options)
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
  *   # Get user role
  *
  *   @params int     id
  *   @return Object  result
  */
  async getRole(id) {
      const rolesResult = await this.query(`
        SELECT *
        FROM roles
        WHERE id = ? LIMIT 1`, [id])

    return rolesResult[0]
  }

  /*
  *   # Rules
  *
  *   @params Joi     v
  *   @return Object  result
  */
  rules(v, data, id) {
    let tempRules = {
      first_name: v.string().required().max(255).label('First Name'),
      last_name: v.string().required().max(255).label('Last Name'),
      email: v.string().email().required().max(255).label('Email'),
      role_id: v.number().required().label('Role')
    }

    if(id) return tempRules

    tempRules.username = v.string().required().max(255).label('Username')
    tempRules.password = v.string().required().max(255).label('Password')

    return tempRules
  }

  /*
  *   # Custom Rules
  *
  *   @params Joi     v
  *   @return Object  result
  */
  async customRules(data, id, vE) {
    await Promise.all([
      this.query(
        `SELECT count(*) as count FROM users WHERE email = ? && id != ?`, 
        [data.email, id]
      ),
      this.query(
        `SELECT count(*) as count FROM users WHERE username = ? && id != ?`, 
        [data.username, id]
      )
    ]).then(([res1, res2]) => {
      let errors = {}
      
      if(res1[0].count)
        errors.email = ['Email already exists']
      if(res2[0].count)
        errors.username = ['Username already exists']

      if(Object.keys(errors).length)
        vE("Invalid Input", errors)
    })
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