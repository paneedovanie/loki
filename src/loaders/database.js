module.exports = async () => {
  let database = null
  switch (config.dbType) {
    case 'mysql':
      const mysql = require('mysql')

      database = mysql.createConnection(config.dbURL, {
        multipleStatements: true
      })

      await database.connect()

      return database
    default:
      const MongooseHelper = require('../helpers/mongoose.helper')

      database = new MongooseHelper(config.dbURL)

      await database.connect();

      return database
  }
}