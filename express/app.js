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
  User.findById("67d6c89f8594d8bbd64e1b77")
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://pranjuljaiswal10:npfacebook@cluster0.d0qa7.mongodb.net/Shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    const user = new User({
      name: "Pranjul",
      email: "pj@jais.com",
      cart: {
        items: [],
      },
    });
    user.save();
    app.listen(3001);
  })
  .catch((err) => console.log(err));
