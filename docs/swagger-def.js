import packageData from "../package.json" with { type: "json" };
import env from "../src/config/config.js";

const swaggerDef = {
  openapi: "3.1.0",
  info: {
    title: "node-express-drizzle API documentation",
    version: packageData.version,
  },
  servers: [
    {
      url: `http://localhost:${env.port}/api`,
    },
  ],
};

export default swaggerDef;
