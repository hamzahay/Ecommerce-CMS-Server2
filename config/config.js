require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.USERNAME_DB_DEV,
    "password": process.env.PASSWORD_DB_DEV,
    "database": process.env.DATABASE_DEV,
    "host": process.env.HOST_DB,
    "dialect": process.env.DIALECT
  },
  "test": {
    "username": process.env.USERNAME_DB_TEST,
    "password": process.env.PASSWORD_DB_TEST,
    "database": process.env.DATABASE_TEST,
    "host": process.env.HOST_DB,
    "dialect": process.env.DIALECT
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
