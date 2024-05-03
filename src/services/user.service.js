import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";

import { db } from "../db/index.js";
import { users } from "../db/schema.js";

/**
 * Create a user
 * @param {Object} data
 * @returns {Promise<users>}
 */
export async function createUser(data) {
  // !NOTE: hashing password in the orm events like mongoose and sequelize will be great but currently drizzle orm doesn't support events
  data.password = await bcrypt.hash(data.password, 10);
  return db
    .insert(users)
    .values(data)
    .returning({ id: users.id, username: users.username, email: users.email })
    .then((res) => res[0]);
}

/**
 * Create a user
 * @param {string} usernameOrEmail
 * @returns {Promise<users>}
 */
export function getUserByUsernameOrEmail(usernameOrEmail) {
  return db.query.users.findFirst({
    where: or(
      eq(users.email, usernameOrEmail),
      eq(users.username, usernameOrEmail)
    ),
  });
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<users>}
 */
export function getUserById(id) {
  return db.query.users.findFirst({ where: eq(users.id, id) }).then((res) => {
    delete res.password;
    return res;
  });
}

/**
 * Get user by id
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<users>}
 */
export async function updateUserById(id, data) {
  if (data.password) {
    // !NOTE: hashing password in the orm events like mongoose and sequelize will be great but currently drizzle orm doesn't support events
    data.password = await bcrypt.hash(data.password, 10);
  }
  return db.update(users).set(data).where(eq(users.id, id));
}
