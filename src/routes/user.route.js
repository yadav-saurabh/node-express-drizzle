import { Router } from "express";

import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */
const userRoutes = Router();

// !NOTE: userRoutes.use(authMiddleware) will also apply on all /api/* apart from authController routes, so instead of 404 it will be 401
// userRoutes.use(authMiddleware);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 */
userRoutes.route("/profile").get(authMiddleware, userController.getUserProfile);

export { userRoutes };
