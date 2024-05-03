import { Router } from "express";

import { userRoutes } from "./user.route.js";
import { authRoutes } from "./auth.route.js";

const router = Router();

// auth routes
router.use("/", authRoutes);

// user routes
router.use("/", userRoutes);

export default router;
