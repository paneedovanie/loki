const cmds = require(`${__basedir}/database/migrations`),
  fs = require('fs'),
  migratedPath = 'storage/cache/migrations.txt',
  databaseLoader = require("../../loaders/database"),
  { getList, query } = require('../../helpers/database.helper')
module.exports = async () => {

  global.database = await databaseLoader()

  switch (config.dbType) {
    case 'mysql':
      const migrated = await getList(migratedPath)

      let
        sql = "",
        migrating = ""

      for (const key of Object.keys(cmds)) {
        if (migrated[key]) continue
        console.log('\x1b[33m%s\x1b[0m', 'Migrating ' + key + '...')
        sql += cmds[key] + "; "
        migrating += key + "\n"
      }
      if (sql !== "") {
        await query(sql)

        fs.appendFileSync(migratedPath, migrating)
        console.log('\x1b[32m%s\x1b[0m', 'Migration completed!');
      }
  }

  database.end()
}