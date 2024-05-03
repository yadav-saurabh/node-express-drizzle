import { Router } from "express";

import { authController } from "../controllers/index.js";
import { insertUserSchema, loginUserSchema } from "../db/users.schema.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const authRoutes = Router();

authRoutes
  .route("/register")
  .post(validateMiddleware(insertUserSchema), authController.register);

authRoutes
  .route("/login")
  .post(validateMiddleware(loginUserSchema), authController.login);

export { authRoutes };
