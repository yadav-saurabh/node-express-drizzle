import { Router } from "express";

import { authController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import {
  insertUserSchema,
  loginUserSchema,
  refreshTokenSchema,
} from "../db/schema.js";

const authRoutes = Router();

authRoutes
  .route("/register")
  .post(validateMiddleware(insertUserSchema), authController.register);

authRoutes
  .route("/login")
  .post(validateMiddleware(loginUserSchema), authController.login);

authRoutes
  .route("/refresh-tokens")
  .post(validateMiddleware(refreshTokenSchema), authController.refreshTokens);

export { authRoutes };
