import httpStatus from "http-status";

export const register = async (req, res) => {
  console.log("register");
  res.status(httpStatus.CREATED).send({ message: "ok" });
};

export const login = async (req, res) => {
  console.log("login");
  res.send({ message: "ok" });
};
