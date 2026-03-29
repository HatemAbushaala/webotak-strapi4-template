module.exports = ({ env }) => {
  let client = env("TEST_DB_CLIENT", "sqlite");
  let isSqlite = client === "sqlite";

  return {
    connection: {
      client,
      connection: {
        host: env("TEST_DB_HOST"),
        database: env("TEST_DB_NAME"),
        user: env("TEST_DB_USER"),
        password: env("TEST_DB_PASSWORD"),
        // only for sqlite
        filename: env("TEST_DB_FILENAME", ".tmp/test.db"),
      },
      // this is important for sqlite to work correctly (to ensure that the application is not accessing the database simultaneously)
      pool: { min: isSqlite ? 1 : 2, max: isSqlite ? 1 : 10 },
      useNullAsDefault: true,
      debug: false,
    },
  };
};
