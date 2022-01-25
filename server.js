const express = require("express");
const req = require("express/lib/request");
const app = express();
const methodOverride = require("method-override");
const dbConnection = require("./config/db.connections.js");
const controllers = require("./controllers");
const PORT = 4000;

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/restaurants", controllers.restaurant);

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/*", (req, res) => {
  res.send("404 page");
});

app.listen(PORT, function () {
  console.log(`I am listening on port ${PORT}`);
});
