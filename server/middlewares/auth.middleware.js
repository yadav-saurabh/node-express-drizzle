export const authMiddleware = async (req, res, next) => {
  console.log("auth middleware");
  // auth middleware logic
  next();
};
