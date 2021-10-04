const { Pool } = require('pg')
const config = require('../../config');

const pool = new Pool(config.db.connect);

module.exports = {
  config: config.db,
  query: (...args) => pool.query(...args),
  getClient: () => pool.connect()
}