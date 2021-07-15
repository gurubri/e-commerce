const Product = require("./models/product");
const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const products = require("./product.json");

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

const seedProducts = async () => {
  try {
    console.log("Products deleted");
    await Product.insertMany(products);
    console.log("Inserted");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
