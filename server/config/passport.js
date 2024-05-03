import { Strategy, ExtractJwt } from "passport-jwt";
import { eq } from "drizzle-orm";

import env from "./config.js";
import { TOKEN_TYPES } from "./tokens.js";
import { users } from "../db/schema.js";
import { db } from "../db/index.js";

const jwtOptions = {
  secretOrKey: env.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

async function jwtVerify(payload, done) {
  try {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.sub),
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}

export const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
