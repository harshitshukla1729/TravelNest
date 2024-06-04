const express = require("express");

const router = express.Router();

const Listing = require("../models/listing");
const Review = require("../models/review");

const wrapAsync = require("../utils/warpAsync");

router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});

    // res.json(allListings);
    res.render("listings/index", {
        listings: allListings,
    });
}));

router.post("/", wrapAsync(async (req, res) => {
    const { title, description, image, price, location, country } = req.body;

    await Listing.create({ title, image, description, price, location, country });

    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}));

router.get("/new", (req, res) => {
    res.render("listings/new");
});

router.get("/:id", wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate("reviews");
    // console.log(listing);

    if(!listing){
        req.flash("error","Listing does Not Exist");
        res.redirect("/listings");
    }

    res.render("listings/show", {
        listing,
    });
}));

router.put("/:id", wrapAsync(async (req, res) => {
    const { title, description, image, price, location, country } = req.body;

    await Listing.findByIdAndUpdate(req.params.id, { title, description, image, price, location, country });

    req.flash("success","Listing Edited!");
    res.redirect(`/listings/${req.params.id}`);
}));

router.delete("/:id", wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success","Listing Deleted!");
    res.redirect(`/listings`);
}));

router.get("/:id/edit", wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        req.flash("error","Listing does Not Exist");
        res.redirect("/listings");
    }
    
    res.render("listings/edit", {
        listing,
    });
}));

router.post("/:id/reviews", wrapAsync(async (req, res) => {
    const { rating, comment } = req.body;

    const result = await Review.create({ rating, comment });

    const listing = await Listing.findById(req.params.id);

    listing.reviews.push(result);
    await listing.save();

    // console.log("Done");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${req.params.id}`);
}));

router.delete("/:listingId/reviews/:reviewId", wrapAsync(async (req, res) => {
    const { listingId, reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });

    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${listingId}`);
}));

module.exports = router;