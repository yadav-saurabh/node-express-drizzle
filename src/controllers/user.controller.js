import { userService } from "../services/index.js";

export async function getUserProfile(req, res) {
  const result = await userService.getUserById(req.user.id);
  res.send(result);
}
