const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV || 'production',
  port: process.env.PORT || '5000',
  secret: process.env.SECRET || 'SECRET',
  dbType: process.env.DB_TYPE || 'mongoose',
  dbURL: process.env.DB_URI || ''
}