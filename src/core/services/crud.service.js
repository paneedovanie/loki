const BaseService = require(`./base.service`)

module.exports = class extends BaseService {
  constructor() {
    super()
  }

  /*
  *   # Return all items on the table
  *
  *   @return array result
  */
  async index() {
    const sql = `SELECT * FROM ${this.table} WHERE deleted_at IS NULL`;

    return this.query(sql)
  }

  /*
  *   # Get an item from the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async read(id) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ${id}`,
      result = await this.query(sql)

    return result[0]
  }

  /*
  *   # Store item to the table
  *
  *   @params Object data
  *   @return Object result
  */
  async store(data) {
    await this.validate(data)

    const
      fData = this.formatStoreData(data),
      sql = `INSERT INTO ${this.table} (${fData.fields}) VALUES ?`;

    return this.query(sql, [[fData.values]])
  }

  /*
  *   # Update item on the table
  *
  *   @params int     id
  *   @params Object  data
  *   @return Object  result
  */
  async update(id, data) {
    await this.validate(data)

    const
      fData = this.formatUpdateData(data),
      sql = `UPDATE ${this.table} SET ${fData}, updated_at = now() WHERE id = ${id}`;

    return this.query(sql)
  }

  /*
  *   # Delete item from the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async deletePermanently(id) {
    const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;

    return this.query(sql)
  }

  /*
  *   # Return all trashed items on the table
  *
  *   @return array result
  */
  async trashed() {
    const sql = `SELECT * FROM ${this.table} WHERE deleted_at IS NOT NULL`;

    return this.query(sql)
  }

  /*
  *   # Trash item on the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async trash(id) {
    const sql = `UPDATE ${this.table} SET deleted_at = now() WHERE id = ${id}`;

    return this.query(sql)
  }

  /*
  *   # Restore item on the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async restore(id) {
    const sql = `UPDATE ${this.table} SET deleted_at = null WHERE id = ${id}`;

    return this.query(sql)
  }
}