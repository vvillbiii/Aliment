const express = require('express');
const app = express();
const methodOverride = require("method-override");
//const dbConnection = require('./config/db.connections.js');
const PORT = 4000;

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, function() {
    console.log(`I am listening on port ${PORT}`)
});

