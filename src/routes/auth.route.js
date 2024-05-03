import { Router } from "express";

import { authController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import {
  forgotPasswordSchema,
  insertUserSchema,
  loginUserSchema,
  logoutTokenSchema,
  refreshTokenSchema,
  resetPasswordSchema,
} from "../db/schema.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
const authRoutes = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: must be unique
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number, one special character, one Uppercase and one lowercase
 *             example:
 *               username: test
 *               email: test@test.com
 *               password: P@ssword123
 *     responses:
 *       "201":
 *         description: Created
 */
authRoutes
  .route("/register")
  .post(validateMiddleware(insertUserSchema), authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *               - password
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 format: email | string
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: test
 *               password: P@ssword123
 *     responses:
 *       "200":
 *         description: OK
 */
authRoutes
  .route("/login")
  .post(validateMiddleware(loginUserSchema), authController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzcxYWQ0Zi05MDY5LTRkNTEtOTI4Ni1mM2FkYTQzNzI5MTAiLCJpYXQiOjE3MTQ3MzE0NTcsImV4cCI6MTcxNDczMzI1NywidHlwZSI6ImFjY2VzcyJ9.ZygGnanFeO-96I7RAV6HLMm5vGlfSxm1BKr4Ag-FwH8
 *     responses:
 *       "204":
 *         description: No content
 */
authRoutes
  .route("/logout")
  .post(validateMiddleware(logoutTokenSchema), authController.logout);

/**
 * @swagger
 * /refresh-tokens:
 *   post:
 *     summary: Refresh auth tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzcxYWQ0Zi05MDY5LTRkNTEtOTI4Ni1mM2FkYTQzNzI5MTAiLCJpYXQiOjE3MTQ3MzE0NTcsImV4cCI6MTcxNDczMzI1NywidHlwZSI6ImFjY2VzcyJ9.ZygGnanFeO-96I7RAV6HLMm5vGlfSxm1BKr4Ag-FwH8
 *     responses:
 *       "200":
 *         description: OK
 */
authRoutes
  .route("/refresh-tokens")
  .post(validateMiddleware(refreshTokenSchema), authController.refreshTokens);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 format: email | username
 *             example:
 *               usernameOrEmail: test
 *     responses:
 *       "204":
 *         description: No content
 */
authRoutes
  .route("/forgot-password")
  .post(
    validateMiddleware(forgotPasswordSchema),
    authController.forgotPassword
  );

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number, one special character, one Uppercase and one lowercase
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzcxYWQ0Zi05MDY5LTRkNTEtOTI4Ni1mM2FkYTQzNzI5MTAiLCJpYXQiOjE3MTQ3MzE0NTcsImV4cCI6MTcxNDczMzI1NywidHlwZSI6ImFjY2VzcyJ9.ZygGnanFeO-96I7RAV6HLMm5vGlfSxm1BKr4Ag-FwH8
 *               password: P@ssword123
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed
 */
authRoutes
  .route("/reset-password")
  .post(validateMiddleware(resetPasswordSchema), authController.resetPassword);

export { authRoutes };
