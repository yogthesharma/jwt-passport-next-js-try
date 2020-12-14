import nc from "next-connect";
import User from "../../../models/User";
import { serialize } from "cookie";
import { issueJWT } from "../../../configs/password";
import dbMiddleware from "../../../middleware/dbMiddleware";

const handler = nc()
  .use(dbMiddleware)
  .post(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "User With This Username Is Not Registered" });

    if (user.password !== password) return res.json({ msg: "Wrong Password" });
    console.log(user);
    if (user) {
      const tokenObject = await issueJWT(user);
      res
        .setHeader(
          "Set-Cookie",
          serialize("token", tokenObject.token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: tokenObject.maxAge,
          })
        )
        .json({ msg: "Cookie Set" });
    } else {
      res.send({ err: "Done" });
    }
  });

export default handler;
