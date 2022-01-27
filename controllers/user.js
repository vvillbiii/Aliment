const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// router.get("/", (req, res) => {
//     User.find({}, (error, foundUser) => {
//         if (error) console.log(error);
//         const context = { User: foundUser };
//         res.render("user.ejs", context);
//     });
//   });
  
  
    router.get("/register", (req, res) => {
    res.render("newuser.ejs");
  });
  router.post("/register", async function(req, res) {
      try{
          const foundUser = await User.exists({ email: req.body.email});
          if(foundUser) {
              console.log("The account already exists");
              return res.redirect("/login");
          }
          const salt = await bcrypt.genSalt(12);
          const hash = await bcrypt.hash(req.body.password, salt);
          req.body.password = hash;
          const newUser = await User.create(req.body);
          console.log(newUser);
          return res.redirect("/login");
      } catch (error) {
          console.log(error);
          return res.send(error);
      }
  });
  router.get("/login", function (req, res) {
      res.render("login");
  });
  
  router.post("/login", async function (req, res) {
      try {
          const foundUser = await User.findOne({email: req.body.email});
          console.log(`foundUser object is ${foundUser}`);
          if(!foundUser) return res.send ("Either the username or password is incorrect");
          const match = await bcrypt.compare(req.body.password, foundUser.password);
          if(!match) return res.send ("Either the username or password is incorrect");
          console.log(`The before version of req.session.currentUser is: ${req.session.currentUser}`);
          req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
        };
        console.log(req.session.currentUser);
        return res.redirect(`users/${foundUser._id}`);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
  });

  
  router.get("/users/:id/logout", async function (req, res) {
    try {
      
      await req.session.destroy();
      return res.redirect("/login");
      
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  });

  router.get("/users/:id", async function (req, res) {
    const id = req.params.id;
    User.findById(id, (error, foundUser) => {
      if (error) console.log(error);
  
      const context = { User: foundUser };
      res.render("user", context);
    });
  });

  router.post("/create", (req, res) => {
    const body = req.body;
    User.create(body, (error, newUser) => {
        if (error) return console.log(error);
  
        res.redirect("newuser.ejs");
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
  
  router.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    User.findByIdAndUpdate(id, body, (error, updateUser) => {
      if (error) console.log(error);
  
      console.log(updateUser);
      res.redirect(`/users/${updateUser._id}`);
    });
  });
  
  router.get("/users/:id/edit", (req, res) => {
    const id = req.params.id;
    User.findById(id, (error, foundUser) => {
      if (error) console.log(error);
  
      const context = { User: foundUser };
      res.render("edit_user.ejs", context);
    });
  });

  
  router.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (error, deleteUser) => {
      if (error) console.log(error);
  
      console.log(deleteUser);
      res.redirect("/");
    });
  });

module.exports = router;