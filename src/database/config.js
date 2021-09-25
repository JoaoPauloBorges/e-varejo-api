"use strict";

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'e-varejo-db',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'e-varejo-db-teste',
    host: '127.0.0.1',
    dialect: 'sqlite'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect: 'postgres'
  }
};