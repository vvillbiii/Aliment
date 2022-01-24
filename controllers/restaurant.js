const express = require("express");
const router = express.Router();
const { Restaurant, User, Review } = require("../models");

router.get("/", (req, res) => {
  Restaurant.find({}, (error, foundRestaurants) => {
    if (error) console.log(error);

    const context = { Restaurant: foundRestaurants };
    res.render("index", context);
  });
});

router.get("/new", (req, res) => {
  res.render("newres");
});

router.post("/", (req, res) => {
  const body = req.body;
  Restaurant.create(body, (error, newRestaurant) => {
    if (error) return console.log(error);

    res.redirect("/restaurants");
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id, (error, foundRestaurant) => {
    if (error) console.log(error);

    const context = { Restaurant: foundRestaurant };
    res.render("restaurant", context);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Restaurant.findByIdAndUpdate(id, body, (error, updateRestaurant) => {
    if (error) console.log(error);

    console.log(updateRestaurant);
    res.redirect(`/restaurants/${updateRestaurant._id}`);
  });
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id, (error, foundRestaurant) => {
    if (error) console.log(error);

    const context = { Restaurant: foundRestaurant };
    res.render("edit", context);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id, (error, deleteRestaurant) => {
    if (error) console.log(error);

    console.log(deleteRestaurant);
    res.redirect("/restaurants");
  });
});

module.exports = router;
