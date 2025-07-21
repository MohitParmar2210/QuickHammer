import mongoose from "mongoose";

export const connection = () => {
  console.log("Connecting to DB:");
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "quickhammer",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};
