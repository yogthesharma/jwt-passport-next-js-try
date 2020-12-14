import crypto from "crypto";
import JWT from "jsonwebtoken";

export const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    hash,
    salt,
  };
};

export const verifyPassword = (password, salt, hash) => {
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashPassword;
};

export const issueJWT = (user) => {
  const id = user._id;
  const expirationTime = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = JWT.sign(payload, "privateKey", {
    expiresIn: expirationTime,
  });

  return {
    token: signedToken,
    expiresIn: expirationTime,
  };
};
