const express = require("express");
const router = express.Router();
const { Restaurant, Review } = require("../models");

router.get("/", async (req, res) => {
  try {
    const foundRestaurants = await Restaurant.find({});
    const context = { Restaurant: foundRestaurants };
    res.render("index", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.get("/new", (req, res) => {
  res.render("newres");
});

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newRestaurant = await Restaurant.create(body);
    res.redirect("/restaurants");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundRestaurant = await Restaurant.findById(id);
    console.log(foundRestaurant);
    const allReviews = await Review.find({ restaurant: id });
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(allReviews);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    const context = {
      Restaurant: foundRestaurant,
      Review: allReviews,
    };
    return res.render("restaurant.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updateRestaurant = await Restaurant.findByIdAndUpdate(id, body);
    res.redirect(`/restaurants/${updateRestaurant._id}`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  try {
    const foundRestaurant = await Restaurant.findById(id);
    const context = { Restaurant: foundRestaurant };
    res.render("edit", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRestaurant = await Restaurant.findByIdAndDelete(id);
    const deleteReview = await Review.deleteMany({ restaurant: id });
    res.redirect("/restaurants");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.post("/:id", async (req, res) => {
  const review = req.body;
  const id = req.params.id;
  try {
    const foundRestaurant = await Restaurant.findById(id);
    const newReview = await Review.create(review);
    res.redirect(`/restaurants/${foundRestaurant._id}`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  const id = req.params.id;
  const reviewId = req.params.reviewId;
  try {
    const foundRestaurant = await Restaurant.findById(id);
    const deleteReview = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/restaurants/${foundRestaurant._id}`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
