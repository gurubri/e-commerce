const express = require("express");
const products = require("./routes/products");
const auth = require("./routes/auth");
const order = require("./routes/order");
const errorMidleware = require("./middlewares/error");
const cookieparser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/api", products);
app.use("/api", auth);
app.use("/api", order);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/build/index.html"));
});

app.use(errorMidleware);

module.exports = app;
