import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import env from "../config/config.js";
import * as schema from "./schema.js";

const client = new Client({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
});

client.connect();

export const db = drizzle(client, { schema: schema });
