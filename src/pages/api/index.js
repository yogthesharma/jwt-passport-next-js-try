import nc from "next-connect";
import dbMiddleware from "../../../middleware/dbMiddleware";
import auth from "../../../middleware/auth";
import passport from "../../../lib/passport";

const handler = nc()
  .use(dbMiddleware)
  .use(auth)
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send({ user: req.user });
  });

export default handler;
