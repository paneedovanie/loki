const
  joi = require('joi'),
  { validationError, formatValidationError } = require(`${__basedir}/helpers/error.helper`),
  { query } = require(`${__basedir}/helpers/database.helper`),
  { htmlDecode } = require(`${__basedir}/helpers/string.helper`),
  dummyHelper = require(`${__basedir}/helpers/dummy.helper`),
  slugify = require('slugify')

module.exports = class {
  constructor() {
    this.query = query
    this.slugify = slugify
  }

  /*
  *   # Return all items on the table
  *
  *   @return array result
  */
  getAll() {
    let sql = `SELECT ${this.columns()} 
      FROM ${this.table} WHERE deleted_at IS NULL`

    return this.query(sql)
  }

  /*
  *   # Format data for storing
  *
  *   @params Object  data
  *   @return Object  result
  */
  formatStoreData(data) {
    let newData = {
      fields: "",
      values: []
    }

    for (const key of Object.keys(data)) {
      const isString = typeof data[key] === 'string'

      newData.fields += (newData.fields !== "" ? ", " : "") + key

      newData.values.push(isString ? htmlDecode(data[key]) : data[key])
    }

    return newData
  }

  /*
  *   # Format data for updating
  *
  *   @params Object  data
  *   @return Object  result
  */
  formatUpdateData(data) {
    let newData = ""

    for (const key of Object.keys(data)) {
      const isString = typeof data[key] === 'string'

      newData += (newData !== "" ? ", " : "")
      if (isString)
        newData += `${key} = "${htmlDecode(data[key])}"`
      else
        newData += `${key} = ${data[key]}`
    }

    return newData
  }


  /*
  *   # Generate a paginated data
  *
  *   @params Object  options
  *   @return Object  result
  */
  async paginate({ page = 1, itemsPerPage = 10, search = '', where = null }) {
    where = where ? "WHERE " + where : ""

    const
      offset = (page - 1) * itemsPerPage,
      countResult = await this.query(`SELECT COUNT(*) AS count FROM ${this.table} ${where}`),
      count = countResult[0].count,
      totalPages = Math.ceil(count / itemsPerPage)

    let sql = `SELECT ${this.columns()} 
      FROM ${this.table} ${where}`
      
    if(itemsPerPage > -1) {
      sql += ` LIMIT ${itemsPerPage} OFFSET ${offset}`
  
      return {
        data: await this.query(sql, where),
        options: {
          page,
          itemsPerPage,
          totalPages,
          totalItems: count,
          prevPage: (page - 1) <= 0 ? null : (page - 1),
          nextPage: (page + 1) > totalPages ? null : (page + 1)
        }
      }
    } else {
      return {
        data: await this.query(sql, where),
        options: {
          page: 1,
          itemsPerPage: -1,
          totalPages: 1,
          totalItems: count,
          prevPage: null,
          nextPage: null
        }
      }
    }
  }

  /*
  *   # Validation
  *
  *   @params Object  data
  *   @params int  id
  */
  async validate(data, id = null) {
    try {
      await joi.object(this.rules(joi, data, id))
        .custom(this.customRules.bind(this, data, id, validationError))
        .options({ abortEarly: false })
        .validateAsync(data)
    } catch (err) {
      if (err._original)
        formatValidationError(err)
      validationError(err.message, err.details)
    }
  }

  /*
  *   # Rules
  *
  *   @params Joi     v
  *   @return Object  result
  */
  rules(v) { return {} }


  /*
  *   # Custom rules
  */
  customRules() { }

  /*
  *   # Generate dummy data
  *
  *   @params Object  data
  *   @return Object  result
  */
  async generate(data, save = true) {
    const dummyDate = { ...await this.dummy(dummyHelper), ...data }
    if (save) return await this.store(dummyDate)
    else return dummyDate
  }

  /*
  *   # Dummy random data
  *
  *   @params DummyHelper h
  *   @return Object      result
  */
  dummy(Dummy) {
    return {}
  }

  /*
  *   # Return random row
  *
  *   @return Object  result
  */
  async random() {
    const random = await this.query(`SELECT * FROM ${this.table}
        ORDER BY RAND()
        LIMIT 1`)

    return random[0]
  }
}