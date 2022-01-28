const express = require("express");
const router = express.Router();
const { Review, Restaurant } = require("../models");


router.get("/", (req, res) => {
    Review.find({}, (error, foundReview) => {
    if (error) console.log(error);
    const context = { Review: foundReview };
    res.render("restaurant.ejs", context);
    });
});

router.post("/", (req, res) => {
    const id = req.params.id;
    const body = req.body.review;
   const foundRestaurant = Restaurant.findById(id, (error, foundRestaurant) => {
     if (error) console.log(error);
    });
      const newReview = body;
      foundRestaurant.Review.push(newReview);
    if (error) return console.log(error);
    res.redirect(`/restaurants/${foundRestaurant._id}`);
});

// router.post("/:reviewsId", (req, res) => {
//     const id = req.params.id;
//     Review.create(id, (error, foundReview) => {
//     if (error) console.log(error);
//     const context = { Review: foundReview };
//     res.render("reviews", context);
//     });
// });
// router.put("/:reviewId", (req, res) => {
//     const id = req.params.id;
//     const body = req.body;
//     Review.findByIdAndUpdate(id, body, (error, updateReview) => {
//     if (error) console.log(error);
    
//         console.log(updateReview);
//         res.redirect(`/reviews/${updateReview._id}`);
//     });
// });
  
//     router.get("/:reviewId/edit", (req, res) => {
//     const id = req.params.id;
//     Review.findById(id, (error, foundReview) => {
//     if (error) console.log(error);
    
//     const context = { Review: foundReview };
//     res.render("edit.ejs", context);
//     });
//   });
  
    router.delete("/:reviewId", (req, res) => {
    const id = req.params.id;
    Review.findByIdAndDelete(id, (error, deleteReview) => {
    if (error) console.log(error);
  
        console.log(deleteReview);
        res.redirect("/reviews");
    });
  });
module.exports = router;
