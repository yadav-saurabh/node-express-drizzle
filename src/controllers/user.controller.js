import httpStatus from "http-status";

import { tokenService, userService } from "../services/index.js";
import { TOKEN_TYPES } from "../config/tokens.js";
import ApiError from "../utils/api-error.js";

export async function createUsers(req, res, next) {
  try {
    const result = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserProfile(req, res) {
  const result = await userService.getUserById(req.user.id);
  res.send(result);
}

export async function logout(req, res, next) {
  try {
    const token = await tokenService.findToken(
      req.user.id,
      req.body.refreshToken,
      TOKEN_TYPES.REFRESH
    );
    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, "token not found");
    }
    await tokenService.deleteToken(token.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}
