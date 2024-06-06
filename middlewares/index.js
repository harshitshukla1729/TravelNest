const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be Logged In!!");
        return res.redirect("/users/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You are not the Owner of this listing.");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review.author._id.equals(req.user._id)) {
        req.flash("error", "You are not the Author of this Review.");
        return res.redirect(`/listings/${req.params.listingId}`);
    }
    next();
}