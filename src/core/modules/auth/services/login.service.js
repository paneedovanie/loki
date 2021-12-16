const
  { CustomError } = require(`${__basedir}/helpers/error.helper`),
  { verifyPassword } = require(`${__basedir}/helpers/encryption.helper`),
  BaseService = require(`${__basedir}/core/services/base.service`),
  jwt = require('jsonwebtoken'),
  RoleService = require(`../../role/services/role.service`)

module.exports = class extends BaseService {
  constructor() {
    super()
    this.roleService = new RoleService
  }

  /*
  *   # Check user credentials
  *
  *   @params Object  data
  *   @return Object  result
  */
  async invoke(data) {
    await this.validate(data)

    const sql = `
        SELECT 
          * 
        FROM 
          users 
        WHERE 
          username = ?
      `;

    const result = await this.query(sql, [data.username])
    let user = result[0]

    try {
      if (user && verifyPassword(data.password, user.password)) {
        delete user.password

        user.role = await this.roleService.read(user.role_id)
        user.role.permissions = (await this.roleService.getPermissions(user.role_id)).map(item => item.title)

        const token = jwt.sign({ id: user.id }, config.secret)

        await this.query("INSERT INTO tokens (token, user_id) VALUES ?", [[[token, user.id]]])

        return { user, token }
      }
    } catch (err) { }

    throw new CustomError('Unauthorized', 'Invalid credential')
  }

  rules(v) {
    return {
      username: v.string().required().max(255),
      password: v.string().required().max(255)
    }
  }
}