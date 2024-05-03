import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import swaggerDefinition from "../docs/swagger-def.js";
import * as errorMiddleware from "./middlewares/error.middleware.js";
import { morganMiddleware } from "./middlewares/morgan.middleware.js";
import { jwtStrategy } from "./config/passport.js";

const app = express();

// request logging.
app.use(morganMiddleware);

// set security HTTP headers
app.use(helmet());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// compress all responses
app.use(compression());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable cors
app.use(cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// api routes
app.use("/api", routes);

// api-docs
const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["docs/*.yml", "src/routes/*.js"],
});
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs, { explorer: true }));

// if error is not an instanceOf APIError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development/local env
app.use(errorMiddleware.handler);

export default app;
