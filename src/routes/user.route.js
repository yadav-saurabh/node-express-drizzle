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

/**
 * @swagger
 * /users/profile:
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
 *                $ref: '#/components/schemas/User'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
userRoutes.route("/profile").get(userController.getUserProfile);

export { userRoutes };
