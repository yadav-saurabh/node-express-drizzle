import passport from "passport";
import httpStatus from "http-status";

import ApiError from "../utils/api-error.js";

export function authMiddleware(req, res, next) {
  const authenticateOption = { session: false };

  passport.authenticate("jwt", authenticateOption, (err, user, info) => {
    if (err || info || !user) {
      next(
        new ApiError(httpStatus.UNAUTHORIZED, err || info || "no user found")
      );
    }
    req.user = user;

    next();
  })(req, res, next);
}
