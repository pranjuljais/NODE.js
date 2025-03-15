const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const { log } = require("console");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67d1ce7a0e9b263090b4e0e6")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://pranjuljaiswal10:npfacebook@cluster0.d0qa7.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));
