module.exports = async () => {
  let database = null
  switch (config.dbType) {
    case 'mysql':
      const mysql = require('mysql')

      database = mysql.createConnection({
        host: config.dbHost,
        port: config.dbPort,
        user: config.dbUser,
        password: config.dbPass,
        database: config.environment === 'test' ? 'loki_test' : config.dbName,
        multipleStatements: true
      })

      await database.connect()

      return database
    default:
      const MongooseHelper = require('../helpers/mongoose.helper')

      database = new MongooseHelper(`mongodb+srv://${config.dbUser}:${config.dbPass}@${config.dbHost}/${config.environment === 'test' ? 'loki_test' : config.dbName}`)

      await database.connect();

      return database
  }
}