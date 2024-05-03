import { sql } from "drizzle-orm";

import app from "./src/app.js";
import env from "./src/config/config.js";
import logger from "./src/config/logger.js";
import { db } from "./src/db/index.js";

// start the server
const server = app.listen(env.port, () => {
  logger.info(`Listening to port ${env.port}`);
});

// check database connection
try {
  const res = await db
    .execute(sql`select 1 as connection`)
    .then((res) => res[0]);
  if (!res.connection) {
    throw new Error("Not connected to database");
  }
  logger.info("Connected to database");
} catch (err) {
  logger.error("Failed to connect to database:", err);
  server.close();
}
