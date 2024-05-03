import bcrypt from "bcrypt";
import httpStatus from "http-status";

import { tokenService, userService } from "../services/index.js";
import ApiError from "../utils/api-error.js";
import { TOKEN_TYPES } from "../config/tokens.js";

export async function register(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
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
      throw new ApiError(httpStatus.UNAUTHORIZED, "username/email and password didn't match");
    }
    const tokens = await tokenService.generateAuthTokens(user);
    delete user.password;
    return res.json({ user, tokens });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const token = await tokenService.findToken(
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


export async function refreshTokens(req, res, next) {
  try {
    const tokens = await tokenService.refreshAuth(req.body.refreshToken);
    return res.json({ tokens });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const user = await userService.getUserByUsernameOrEmail(
      req.body.usernameOrEmail
    );
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      user.email
    );
    // ? mail the resetPasswordToken
    console.log("===========resetPasswordToken==========");
    console.log(resetPasswordToken);
    console.log("===========resetPasswordToken==========");

    // !NOTE: change the logic and send the resetPasswordToken in email instead in response
    res
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .send({
        message:
          "not a real server error",
        description: "copy the resetPasswordToken from server console or use UNSAFE_RESET_PASSWORD_TOKEN",
        UNSAFE_RESET_PASSWORD_TOKEN: resetPasswordToken,
      });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(req.body.token, TOKEN_TYPES.RESET_PASSWORD);
    console.log(resetPasswordTokenDoc);
    const user = await userService.getUserById(resetPasswordTokenDoc.userId);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
    await userService.updateUserById(user.id, { password: req.body.password });
    await tokenService.deleteMany(user.id, TOKEN_TYPES.RESET_PASSWORD);

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
}
