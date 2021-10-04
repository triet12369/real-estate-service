// Update with your config settings.
require('dotenv').config();
const config = require('./config');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      ...config.db.connect
    },
    debug: true
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
