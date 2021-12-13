const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV || 'production',
  port: process.env.PORT || '5000',
  secret: process.env.SECRET || 'SECRET',
  dbType: process.env.DB_TYPE || 'mongoose',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || null,
  dbName: process.env.DB_NAME || '',
  dbUser: process.env.DB_USER || '',
  dbPass: process.env.DB_PASS || '',
  tokenDuration: process.env.TOKEN_DURATION || 1
}