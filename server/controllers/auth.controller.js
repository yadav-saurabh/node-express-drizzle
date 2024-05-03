import bcrypt from "bcrypt";
import httpStatus from "http-status";

import { tokenService, userService } from "../services/index.js";
import ApiError from "../utils/api-error.js";

export async function register(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    console.log(user);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await userService.getUserByUsernameOrEmail(
      req.body.usernameOrEmail
    );

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "username/email and password didn't match"
      );
    }

    const tokens = await tokenService.generateAuthTokens(user);

    delete user.password;
    return res.json({ user, tokens });
  } catch (error) {
    next(error);
  }
}
