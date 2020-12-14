import { parse } from "cookie";
import passport from "passport";
import JWTStartegy from "passport-jwt";
import User from "../models/User";

// custom cookie reader for reading cookies in request

const customCookieReader = (req) => {
  const cookie = parse(req.headers.cookie);
  console.log(cookie);
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

passport.use(
  new JWTStartegy(
    {
      jwtFromRequest: JWTStartegy.ExtractJwt.fromHeader("token"),
    },
    async (payload, done) => {
      await User.findOne({ _id: payload.sub })
        .then((user) => {
          if (!user) done(null, false);
          done(null, user);
        })
        .catch((err) => done(err, false));
    }
  )
);

export default passport;
