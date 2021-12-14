
const cmds = require("../../database/seeders"),
  fs = require('fs'),
  databaseLoader = require("../../loaders/database"),
  testDatabaseLoader = require("../../loaders/testDatabase"),
  { getList, query } = require('../../helpers/database.helper'),
  seededPath = 'storage/cache/seeders.txt'

module.exports = async () => {
  global.database = await databaseLoader()
  testDatabase = await testDatabaseLoader()

  switch (config.dbType) {
    case 'mysql':
      const seeded = await getList(seededPath)

      let
        sql = "",
        seeding = ""

      for (const key of Object.keys(cmds)) {
        if (seeded[key]) continue
        console.log('\x1b[33m%s\x1b[0m', 'Seeding ' + key + '...')
        sql += cmds[key] + "; "
        seeding += key + "\n"
      }

      if (sql !== "") {
        await query(sql)
        await testDatabase.query(sql)

        fs.appendFileSync(seededPath, seeding)
        console.log('\x1b[32m%s\x1b[0m', 'Seeder completed!');
      }
  }

  database.end()
  testDatabase.end()
}