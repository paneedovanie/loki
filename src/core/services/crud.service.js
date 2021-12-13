const BaseService = require(`./base.service`)

module.exports = class extends BaseService {
  constructor() {
    super()

    this.showColumns = []
  }

  /*
  *   # Return all columns
  *
  *   @return array result
  */
  columns() {
    let string = ""

    for (const col of this.showColumns)
      string += (string === "" ? "" : ", ") + col

    return string === "" ? "*" : string
  }

  /*
  *   # Return all items on the table
  *
  *   @return array result
  */
  async index() {
    const sql = `SELECT ${this.columns()} FROM ${this.table} WHERE deleted_at IS NULL`;

    return this.query(sql)
  }

  /*
  *   # Get an item from the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async read(id) {
    const sql = `SELECT ${this.columns()} FROM ${this.table} WHERE id = ?`,
      result = await this.query(sql, [id])

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
      sql = `UPDATE ${this.table} SET ${fData}, updated_at = now() WHERE id = ?`;

    return this.query(sql, [id])
  }

  /*
  *   # Delete item from the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async deletePermanently(id) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;

    return this.query(sql, [id])
  }

  /*
  *   # Return all trashed items on the table
  *
  *   @return array result
  */
  async trashed() {
    const sql = `SELECT ${this.columns()} FROM ${this.table} WHERE deleted_at IS NOT NULL`;

    return this.query(sql)
  }

  /*
  *   # Trash item on the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async trash(id) {
    const sql = `UPDATE ${this.table} SET deleted_at = now() WHERE id = ?`;

    return this.query(sql, [id])
  }

  /*
  *   # Restore item on the table
  *
  *   @params int     id
  *   @return Object  result
  */
  async restore(id) {
    const sql = `UPDATE ${this.table} SET deleted_at = null WHERE id = ?`;

    return this.query(sql, [id])
  }
}