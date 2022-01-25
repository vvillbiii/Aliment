const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res) => {
    User.find({}, (error, foundUser) => {
        if (error) console.log(error);
        const context = { User: foundUser };
        res.render("user.ejs", context);
    });
  });
  
  
    router.get("/new", (req, res) => {
    res.render("newuser.ejs");
  });
  
  router.post("/", (req, res) => {
    const body = req.body;
    User.create(body, (error, newUser) => {
        if (error) return console.log(error);
  
        res.redirect("/user");
    });
  });
  
    router.get("/:userId", (req, res) => {
    const id = req.params.id;
    User.findById(id, (error, foundUser) => {
        if (error) console.log(error);
        const context = { User: foundUser };
        res.render("user.ejs", context);
    });
  });
  
  router.put("/:userId", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    User.findByIdAndUpdate(id, body, (error, updateUser) => {
      if (error) console.log(error);
  
      console.log(updateUser);
      res.redirect(`/user/${updateUser._id}`);
    });
  });
  
  router.get("/:userId/edit", (req, res) => {
    const id = req.params.id;
    User.findById(id, (error, foundUser) => {
      if (error) console.log(error);
  
      const context = { User: foundUser };
      res.render("user.ejs", context);
    });
  });
  
  router.delete("/:userId", (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (error, deleteUser) => {
      if (error) console.log(error);
  
      console.log(deleteUser);
      res.redirect("/user");
    });
  });

module.exports = router;