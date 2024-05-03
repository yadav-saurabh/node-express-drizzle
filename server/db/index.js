import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import env from "../config/config.js";
import logger from "../config/logger.js";
import * as schema from "./schema.js";

const postgresClient = postgres({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
});

export const db = drizzle(postgresClient, {
  schema,
  logger: {
    logQuery(query, params) {
      if (env.nodeEnv !== "production") {
        const message = query + (params.length ? ` -- params: ${params}` : "");
        logger.info(message);
      }
    },
  },
});
