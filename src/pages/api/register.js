import nc from "next-connect";
import dbMiddleware from "../../../middleware/dbMiddleware";
import User from "../../../models/User";
import { serialize } from "cookie";
import { issueJWT } from "../../../configs/password";

const handler = nc()
  .use(dbMiddleware)
  .post(async (req, res) => {
    const { username, name, password } = req.body;
    const user = User({
      username,
      name,
      password,
    });

    const savedUser = await user.save();

    if (savedUser) {
      const tokenObject = await issueJWT(savedUser);
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
