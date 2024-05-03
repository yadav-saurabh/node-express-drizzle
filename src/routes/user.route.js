import { Router } from "express";

import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { logoutTokenSchema } from "../db/schema.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const userRoutes = Router();

// !NOTE: userRoutes.use(authMiddleware) will also apply on all /api/* apart from authController routes, so instead of 404 it will be 401
// userRoutes.use(authMiddleware);

userRoutes.route("/profile").get(authMiddleware, userController.getUserProfile);

userRoutes
  .route("/logout")
  .post(
    authMiddleware,
    validateMiddleware(logoutTokenSchema),
    userController.logout
  );

export { userRoutes };
