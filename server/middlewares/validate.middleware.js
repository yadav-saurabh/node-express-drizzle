import httpStatus from "http-status";

export function validateMiddleware(schema) {
  return async function validate(req, res, next) {
    try {
      const data = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = data.body;
      req.query = data.query;
      req.params = data.params;
      return next();
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json(error);
    }
  };
}
