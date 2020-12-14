import nc from "next-connect";
import passport from "../lib/passport";

const handler = nc().use(passport.initialize());

export default handler;
