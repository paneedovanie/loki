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
  *   # Return paginated items on the table
  *
  *   @return array result
  */
  index(options) {
    options.where = `deleted_at IS NULL`

    return this.paginate(options)
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
      sql = `INSERT INTO ${this.table} (${fData.fields}) VALUES ?`,
      result = await this.query(sql, [[fData.values]]),
      added = await this.query(`
        SELECT ${this.columns()} 
        FROM ${this.table} 
        WHERE id = ? LIMIT 1`, result.insertId)

    return added[0]
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
      sql = `UPDATE ${this.table} SET ${fData}, updated_at = now() WHERE id = ?; SELECT ${this.columns()} 
        FROM ${this.table} 
        WHERE id = ? LIMIT 1`,
      result = await this.query(sql, [id, id])

    return result[1][0]
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
  *   # Return paginated trashed items o this.query(sql) the table
  *
  *   @return array result
  */
  trashed(options) {
    options.where = `deleted_at IS NOT NULL`

    return this.paginate(options)
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