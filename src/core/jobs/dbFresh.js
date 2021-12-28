
const
  { query } = require('../../helpers/database.helper'),
  databaseLoader = require("../../loaders/database"),
  fs = require('fs'),
  migratedPath = 'storage/cache/migrations.txt',
  seededPath = 'storage/cache/seeders.txt'

module.exports = async () => {
  console.log('\x1b[33m%s\x1b[0m', 'Database is being refresh...');

  global.database = await databaseLoader()

  switch (config.dbType) {
    case 'mysql':
      const sql = `DROP DATABASE [IF EXISTS] ${config.dbName}; CREATE DATABASE ${config.dbName};`
      await query(sql)

      await query(`DROP DATABASE [IF EXISTS] loki_test; CREATE DATABASE loki_test;`)

      if (fs.existsSync(seededPath))
        fs.unlinkSync(seededPath)
      if (fs.existsSync(migratedPath))
        fs.unlinkSync(migratedPath)
  }

  console.log('\x1b[32m%s\x1b[0m', 'Database is now fresh!');

  database.end()
}
