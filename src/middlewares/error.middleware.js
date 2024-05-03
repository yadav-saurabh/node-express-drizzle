import httpStatus from "http-status";

import APIError from "../utils/api-error.js";
import env from "../config/config.js";
import logger from "../config/logger.js";
import ApiError from "../utils/api-error.js";

/**
 * Error handler. Send stacktrace only during local
 * @public
 */
export const handler = (err, req, res, next) => {
  let { statusCode, message } = err;

  const response = {
    code: statusCode,
    message,
    ...(env.nodeEnv !== "production" && { stack: err.stack }),
  };

  if (env.nodeEnv !== "production") {
    logger.log(
      statusCode === httpStatus.NOT_FOUND ? "silly" : "error",
      "Error handler error log:",
      err
    );
  }

  res.status(statusCode).send(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (error, req, res, next) => {
  // !NOTE: error instanceof PostgresError not working PostgresError is not exported from postgres package
  if (error.constructor.name === "PostgresError") {
    if (error.routine === "_bt_check_unique") {
      const [key, value] = error.detail
        .match(/\(([^)]+)\)/g)
        .map((x) => x.replace(/[()]/g, ""));
      const message = `${key} ${value} already exists. Please try again using different value`;
      throw new ApiError(httpStatus.BAD_REQUEST, message, false, error.stack);
    }
    const message = error.message || httpStatus[statusCode];
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      message,
      false,
      error.stack
    );
  }

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    throw new ApiError(statusCode, message, false, error.stack);
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
