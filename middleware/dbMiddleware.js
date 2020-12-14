import nc from "next-connect";
import dbConnect from "../db/dbConnect";

const dbMiddleware = nc().use((req, res, next) => {
  dbConnect();
  next();
});

export default dbMiddleware;
