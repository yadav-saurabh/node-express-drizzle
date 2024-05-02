import { Router } from "express";

import { userRoutes } from "./user.route.js";
import { authRoutes } from "./auth.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/", authRoutes);
router.use("/", authMiddleware, userRoutes);

export default router;
