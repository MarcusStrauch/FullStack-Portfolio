require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.DB_NAME,
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DB_CONN,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DB_CONN,
    acquireConnectionTimeout: 1000000,
    pool: {
      min: 0,
      max: 5,
      acquireTimeoutMillis: 300000,
      createTimeoutMillis: 300000,
      destroyTimeoutMillis: 300000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 2000,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
