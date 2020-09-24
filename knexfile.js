// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lifehacks.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  //add testing
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/lifehacks.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",

    },
    seeds: {
      directory: "./data/seeds",
    },

  },
  //add a production
  
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};
