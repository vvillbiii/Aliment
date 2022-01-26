const express = require("express");
const router = express.Router();
const { Restaurant, Review } = require("../models");

router.get("/", (req, res) => {
  Restaurant.find({}, (error, foundRestaurants) => {
    if (error) {
      console.log(error);
    }
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
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    // console.log(foundRestaurant.review);
    Review.find({ restaurant: id }, (error, allReviews) => {
      // console.log(allReviews);
      const context = {
        Restaurant: foundRestaurant,
        Review: allReviews,
      };
      return res.render("restaurant", context);
    });
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

router.post("/:id", (req, res) => {
  const review = req.body;
  const id = req.params.id;

  // console.log(Review);
  // Review.create(review, (error, newReview) => {
  //   if (error) return console.log(error);
  //   newReview.restaurant = req.params.id;
  //   console.log(newReview);
  // });

  // const newReview = new Review(review);
  // // console.log(newReview);
  Restaurant.findById(id, (error, foundRestaurant) => {
    if (error) {
      console.log(error);
    }

    Review.create(review, (error, newReview) => {
      if (error) return console.log(error);

      // review.restaurant = foundRestaurant._id;
      // console.log(newReview);
      // console.log(review);
      // foundRestaurant.review.push(newReview);
      // console.log(foundRestaurant.review);
      // console.log(foundRestaurant);
      res.redirect(`/restaurants/${foundRestaurant._id}`);
    });
  });
});

module.exports = router;
