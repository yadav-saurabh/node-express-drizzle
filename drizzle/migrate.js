import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const client = postgres({
    max: 1,
    host: process.env.POSTGRESQL_HOST,
    port: +(process.env.POSTGRESQL_PORT || "5432"),
    database: process.env.POSTGRESQL_DB_NAME,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
  });

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "./drizzle/migrations" });
  await client.end();
}

main();
