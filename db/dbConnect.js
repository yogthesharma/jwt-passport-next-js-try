import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return console.log("Database Already Connected");
  }

  const db = await mongoose.connect(
    "mongodb://localhost:27017/jwt_next_try",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err)
        return console.log("Some Error Occured In Connecting  With Database.");
      return console.log("Database Connected");
    }
  );
};

export default dbConnect;
