// !NODE: --experimental-json-modules
// import packageData from "../package.json" with { type: "json" };
import fs from "node:fs";
import env from "../src/config/config.js";

const packageData = JSON.parse(fs.readFileSync("./package.json"));

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
