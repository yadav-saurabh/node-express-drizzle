import { Router } from "express";

import { getUser } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.route("/profile").get(getUser);

export { userRoutes };
