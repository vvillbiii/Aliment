const express = require("express");
const router = express.Router();
const { Review } = require("../models");


router.get("/", (req, res) => {
    Review.find({}, (error, foundReview) => {
    if (error) console.log(error);
    const context = { Review: foundReview };
    res.render("restaurant.ejs", context);
    });
});

router.post("/create", (req, res) => {
    const body = req.body;
    Review.create(body, (error, newReviews) => {
    if (error) return console.log(error);
    res.redirect("/reviews");
    });
});

router.get("/:reviewId", (req, res) => {
    const id = req.params.id;
    Review.findById(id, (error, foundReview) => {
    if (error) console.log(error);
    const context = { Review: foundReview };
    res.render("review", context);
    });
});
router.put("/:reviewId", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Review.findByIdAndUpdate(id, body, (error, updateReview) => {
    if (error) console.log(error);
    
        console.log(updateReview);
        res.redirect(`/reviews/${updateReview._id}`);
    });
});
  
    router.get("/:reviewId/edit", (req, res) => {
    const id = req.params.id;
    Review.findById(id, (error, foundReview) => {
    if (error) console.log(error);
    
    const context = { Review: foundReview };
    res.render("edit.ejs", context);
    });
  });
  
    router.delete("/:reviewId", (req, res) => {
    const id = req.params.id;
    Review.findByIdAndDelete(id, (error, deleteReview) => {
    if (error) console.log(error);
  
        console.log(deleteReview);
        res.redirect("/reviews");
    });
  });
module.exports = router;
