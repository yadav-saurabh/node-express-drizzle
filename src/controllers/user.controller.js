import httpStatus from "http-status";

import { tokenService, userService } from "../services/index.js";
import { TOKEN_TYPES } from "../config/tokens.js";

export async function createUsers(req, res, next) {
  try {
    const result = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req, res) {
  const result = await userService.queryUsers();
  res.send(result);
}

export async function logout(req, res, next) {
  try {
    await tokenService.logout(req.body.refreshToken, TOKEN_TYPES.REFRESH);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}
