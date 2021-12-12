require("../loaders/global")

const
  { argv } = require('process'),
  migrate = require('../core/jobs/migrate'),
  dbSeed = require('../core/jobs/dbSeed'),
  dbFresh = require('../core/jobs/dbFresh'),
  makeUser = require('../core/jobs/makeUser')

global.config = config;

const main = () => {

  switch (argv[2]) {
    case 'db:fresh':
      dbFresh()
      break;
    case 'migrate':
      migrate()
      break;
    case 'db:seed':
      dbSeed()
      break;
    case 'make:user':
      makeUser()
      break;
  }
}

main()