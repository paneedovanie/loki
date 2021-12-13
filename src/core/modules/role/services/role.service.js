const CrudService = require(`${__basedir}/core/services/crud.service`)

module.exports = class extends CrudService {
  constructor() {
    super()
    this.table = 'roles'
  }

  getPermissions(id) {
    const sql = `
        SELECT 
          P.id AS id, title, code, description
        FROM 
          role_permissions RP 
        JOIN 
          permissions P ON RP.permission_id = P.id 
        WHERE 
          RP.role_id = ?`

    return this.query(sql, [id])
  }

  rules(v) {
    return {
      title: v.string().required().max(255),
      slug: v.string().required(),
      description: v.string().max(255),
    }
  }
}