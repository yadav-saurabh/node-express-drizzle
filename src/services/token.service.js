import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import httpStatus from "http-status";
import { and, eq } from "drizzle-orm";

import env from "../config/config.js";
import * as userService from "./user.service.js";
import ApiError from "../utils/api-error.js";
import { TOKEN_TYPES } from "../config/tokens.js";
import { tokens, users, insertTokenSchema } from "../db/schema.js";
import { db } from "../db/index.js";

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {dayjs.Dayjs} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export function generateToken(userId, expires, type, secret = env.jwt.secret) {
  const payload = {
    sub: userId,
    iat: dayjs(new Date()).unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
}

/**
 * Save a token
 * @param {insertTokenSchema} data
 * @returns {Promise<tokens>}
 */
export function saveToken(data) {
  return db.insert(tokens).values(data).returning();
}

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<tokens>}
 */
export async function verifyToken(token, type) {
  const payload = jwt.verify(token, env.jwt.secret);
  const tokenDoc = await db.query.tokens.findFirst({
    where: and(
      eq(tokens.userId, payload.sub),
      eq(tokens.token, token),
      eq(tokens.type, type),
      eq(tokens.blacklisted, false)
    ),
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
}

/**
 * Generate auth tokens
 * @param {users} user
 * @returns {Promise<Object>}
 */
export async function generateAuthTokens(user) {
  const accessTokenExpires = dayjs().add(env.jwt.accessExpirationMinutes, "m");
  console.log("generateAuthTokens", user);
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TOKEN_TYPES.ACCESS
  );

  const refreshTokenExpires = dayjs().add(env.jwt.refreshExpirationDays, "d");
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    TOKEN_TYPES.REFRESH
  );
  await saveToken({
    token: refreshToken,
    userId: user.id,
    expires: refreshTokenExpires,
    type: TOKEN_TYPES.REFRESH,
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
}

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
export async function refreshAuth(refreshToken) {
  try {
    const refreshTokenDoc = await verifyToken(
      refreshToken,
      TOKEN_TYPES.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await deleteToken(refreshTokenDoc.id);
    return generateAuthTokens(user);
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
}

/**
 * Generate reset password token
 * @param {string} usernameOrEmail
 * @returns {Promise<string>}
 */
export async function generateResetPasswordToken(usernameOrEmail) {
  const user = await userService.getUserByUsernameOrEmail(usernameOrEmail);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found");
  }
  const expires = dayjs().add(env.jwt.resetPasswordExpirationMinutes, "m");
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    TOKEN_TYPES.RESET_PASSWORD
  );
  await saveToken({
    token: resetPasswordToken,
    userId: user.id,
    expires,
    type: TOKEN_TYPES.RESET_PASSWORD,
  });
  return resetPasswordToken;
}

/**
 * Generate verify email token
 * @param {users} user
 * @returns {Promise<string>}
 */
export async function generateVerifyEmailToken(user) {
  const expires = dayjs().add(env.jwt.verifyEmailExpirationMinutes, "m");
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    TOKEN_TYPES.VERIFY_EMAIL
  );
  await saveToken({
    token: verifyEmailToken,
    userId: user.id,
    expires,
    type: TOKEN_TYPES.VERIFY_EMAIL,
  });
  return verifyEmailToken;
}

/**
 * delete token
 * @param {users} user
 * @returns {Promise}
 */
export async function deleteToken(id) {
  return db.delete(tokens).where(eq(tokens.id, id));
}
