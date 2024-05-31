const express = require("express");

const router = express.Router();

const Listing = require("../models/listing");

router.get("/", async (req, res) => {
    const allListings = await Listing.find({});

    // res.json(allListings);
    res.render("listings/index", {
        listings: allListings,
    });
});

router.post("/", async (req, res) => {
    const { title, description, price, location, country } = req.body;

    await Listing.create({ title, description, price, location, country });

    res.redirect("/listings");
});



router.get("/new", (req, res) => {
    res.render("listings/new");
});

router.get("/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show", {
        listing,
    });
});

router.put("/:id", async (req, res) => {
    const { title, description, price, location, country } = req.body;

    await Listing.findByIdAndUpdate(req.params.id, { title, description, price, location, country });

    res.redirect(`/listings/${req.params.id}`);
});

router.delete("/:id", async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect(`/listings`);
});

router.get("/:id/edit", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", {
        listing,
    });
});




module.exports = router;