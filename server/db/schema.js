import { serial, text, timestamp, pgTable, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("manufacturer"),
  password: numeric("price"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
