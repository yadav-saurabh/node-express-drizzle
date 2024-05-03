import "dotenv/config.js";
import z from "zod";

import logger from "./logger.js";

const EnvVariables = z.object({
  PORT: z.preprocess((a) => +a, z.number().optional().default(5000)),
  POSTGRESQL_HOST: z.string(),
  POSTGRESQL_PORT: z.preprocess((a) => +a, z.number().optional().default(5432)),
  POSTGRESQL_DB_NAME: z.string(),
  POSTGRESQL_USER: z.string(),
  POSTGRESQL_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.preprocess((a) => +a, z.number().default(30)),
  JWT_REFRESH_EXPIRATION_DAYS: z.preprocess((a) => +a, z.number().default(30)),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.preprocess((a) => +a, z.number().default(10)),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.preprocess((a) => +a, z.number().default(10)),
});

let envVars;

try {
  envVars = EnvVariables.parse(process.env);
} catch (error) {
  logger.error(`Env validation error: ${error}`);
  process.exit(1);
}

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: envVars.PORT,
  db: {
    host: envVars.POSTGRESQL_HOST,
    port: envVars.POSTGRESQL_PORT,
    database: envVars.POSTGRESQL_DB_NAME,
    user: envVars.POSTGRESQL_USER,
    password: envVars.POSTGRESQL_PASSWORD,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};

export default env;
