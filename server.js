const express = require("express");
const req = require("express/lib/request");
const app = express();
const methodOverride = require("method-override");
const dbConnection = require("./config/db.connections.js");
const controllers = require("./controllers");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: "super secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    },
  })
);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/restaurants", controllers.restaurant);
app.use("/reviews", controllers.review);
app.use("/", controllers.user);

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/*", (req, res) => {
  res.send("404 page");
});

app.listen(process.env.PORT || 3000);
