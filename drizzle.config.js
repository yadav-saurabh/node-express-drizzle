import "dotenv/config";

export default {
  schema: "db/schema.js",
  out: "drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.POSTGRESQL_HOST,
    port: +(process.env.POSTGRESQL_PORT || "5432"),
    database: process.env.POSTGRESQL_DB_NAME,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
  },
};
