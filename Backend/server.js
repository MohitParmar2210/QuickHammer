// import dotenv from "dotenv";
// dotenv.config({ path: "./config/config.env" });

// import { connection } from "./databse/connection.js";
// import app from "./app.js";
// import cloudinary from "cloudinary";

// import { User } from "./models/userSchema.js";

// connection();

// // Create Admin
// const createAdmin = async () => {
//   const existingAdmin = await User.findOne({
//     email: "mohitparmar2210@gmail.com",
//   });

//   if (existingAdmin) {
//     console.log("Admin already exists");
//     return;
//   }

//   await User.create({
//     userName: "Admin",
//     email: "mohitparmar2210@gmail.com",
//     password: "admin123",
//     role: "Super Admin",
//     phone: "9131797927",
//     address: "India",
//     profileImage: {
//       public_id: "dummy",
//       url: "https://dummyimage.com/200x200",
//     },
//   });

//   console.log("Admin Created");
// };

// createAdmin();

// // Cloudinary config
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Start Server
// app.listen(process.env.PORT, () => {
//   console.log(`Server listening on port ${process.env.PORT}`);
// });

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import { connection } from "./databse/connection.js";
import app from "./app.js";
import cloudinary from "cloudinary";

connection();

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});