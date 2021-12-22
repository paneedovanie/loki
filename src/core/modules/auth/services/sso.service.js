const { CustomError } = require(`${__basedir}/helpers/error.helper`),
  BaseService = require(`${__basedir}/core/services/base.service`),
  jwt = require("jsonwebtoken"),
  RoleService = require(`../../role/services/role.service`);

module.exports = class extends BaseService {
  constructor() {
    super();
    this.roleService = new RoleService();
  }

  /*
   *   # Check user sso credentials
   *
   *   @params Object  data
   *   @return Object  result
   */
  async invoke(data) {
    try {
      const sql = `
        INSERT INTO 
          users (first_name, last_name, email, role_id, provider, provider_id) 
        VALUES ? 
        ON DUPLICATE KEY UPDATE provider_id = '${data._id}';
        `;

      const result = await this.query(sql, [
        [[data.firstName, data.lastName, data.email, 2, "users", data._id]],
      ]);

      const users = await this.query(
        `SELECT id, first_name, last_name, email, role_id, created_at, updated_at FROM users WHERE id = ?`,
        result.insertId
      );

      let user = users[0];

      user.role = await this.roleService.read(user.role_id);
      user.role.permissions = (
        await this.roleService.getPermissions(user.role_id)
      ).map((item) => item.title);

      const token = jwt.sign({ id: user.id }, config.secret);

      await this.query("INSERT INTO tokens (token, user_id) VALUES ?", [
        [[token, user.id]],
      ]);

      return { user, token };
    } catch (error) { log(error) }

    throw new CustomError("Unauthorized", "Invalid credential");
  }
};
