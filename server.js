const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
dotenv.config();
const path = require("path");

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Database connected");
  }
);

process.on("uncaughtException", (err) => {
  console.log("Error:" + err.message);
  console.log("Shutting server down due to unhandled rejection");

  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    "Server running in " + process.env.NODE_ENV + "on Port " + process.env.PORT
  );
});

process.on("unhandledRejection", (err) => {
  console.log("Error:" + err.message);
  console.log("Shutting server down due to unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
