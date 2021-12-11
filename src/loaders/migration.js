const cmds = require("../migrations");

module.exports = () => {
  switch (config.dbType) {
    case 'mysql':
      for (const key of Object.keys(cmds)) {

        database.query(cmds[key], function (err, result) {
          if (err) throw err;
          console.log('Commands executed!');
        });
      }
  }
}