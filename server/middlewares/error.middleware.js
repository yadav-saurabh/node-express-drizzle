import httpStatus from "http-status";

import APIError from "../utils/api-error.js";
import env from "../config/config.js";
import logger from "../config/logger.js";

/**
 * Error handler. Send stacktrace only during local
 * @public
 */
export const handler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (env.nodeEnv === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  const response = {
    code: statusCode,
    message,
    ...(env.nodeEnv === "local" && { stack: err.stack }),
  };

  if (env.nodeEnv === "local") {
    logger.error("Error handler error log:", err);
  }

  res.status(statusCode).send(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? BAD_REQUEST
        : INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req, res, next) => {
  const error = new APIError(httpStatus.NOT_FOUND, "Not found");
  next(error);
};
