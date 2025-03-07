// app.js
const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'misael';
const DB_NAME = process.env.DB_NAME || 'oki';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

module.exports = {
  PORT: PORT,
  DB_HOST: DB_HOST,
  DB_USER: DB_USER,
  DB_PASSWORD: DB_PASSWORD,
  DB_NAME: DB_NAME,
};