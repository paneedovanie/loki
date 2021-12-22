const
  path = require('path'),
  config = require(`../config`),
  { log } = require('../helpers/error.helper')



global.config = config
global.__basedir = path.join(__dirname, '..')
global.log = log