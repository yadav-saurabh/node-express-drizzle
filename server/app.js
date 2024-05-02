import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

import routes from "./routes/index.js";
import { morganMiddleware } from "./middlewares/morgan.middleware.js";
import { converter, notFound, handler } from "./middlewares/error.middleware.js";

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

// api routes
app.use("/api", routes);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward
app.use(notFound);

// error handler, send stacktrace only during development/local env
app.use(handler);

export default app;
