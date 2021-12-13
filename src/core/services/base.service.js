const
  joi = require('joi'),
  { validationError, formatValidationError } = require(`${__basedir}/helpers/error.helper`),
  { query } = require(`${__basedir}/helpers/database.helper`),
  { htmlDecode } = require(`${__basedir}/helpers/string.helper`)

module.exports = class {
  constructor() {
    this.query = query
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
  *   # Validation
  *
  *   @params Object  data
  *   @params int  id
  */
  async validate(data, id = null) {
    try {
      await joi.object(this.rules(joi))
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
  *   @params Object  v
  *   @return Object  result
  */
  rules(v) { return {} }


  /*
  *   # Custom rules
  */
  customRules() { }
}