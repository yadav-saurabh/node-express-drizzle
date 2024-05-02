import { Router } from "express";

import { register, login } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.route("/register").get(register);

authRoutes.route("/login").get(login);

export { authRoutes };
