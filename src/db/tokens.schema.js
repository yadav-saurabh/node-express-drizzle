import { sql } from "drizzle-orm";
import {
  text,
  timestamp,
  pgTable,
  uuid,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "./users.schema.js";
import { TOKEN_TYPES } from "../config/tokens.js";

export const tokenTypes = pgEnum("token_types", [
  TOKEN_TYPES.REFRESH,
  TOKEN_TYPES.RESET_PASSWORD,
  TOKEN_TYPES.VERIFY_EMAIL,
]);

export const tokens = pgTable("tokens", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull(),
  type: tokenTypes("type").notNull(),
  blacklisted: boolean("blacklisted").notNull().default(false),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTokenSchema = z.object({ body: createInsertSchema(tokens) });

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});
