import app from "./app.js";
import env from "./config/config.js";
import logger from "./config/logger.js";

app.listen(env.port, () => {
  logger.info(`Listening to port ${env.port}`);
});
