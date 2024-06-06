const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/warpAsync");
const {
  isLoggedIn,
  isOwner,
  isReviewAuthor,
  validateListing,
  validateReview,
} = require("../middlewares");

const {
  handlePostNewListing,
  handleGetAllListings,
  handleCreateNewListingPage,
  handleGetListingById,
  handlePutListingById,
  handleDeleteListingById,
  handleEditListingPage,
  handleDeleteReview,
  handlePostNewReview,
} = require("../controllers/listing");

// Listing - Routes

router.get("/", wrapAsync(handleGetAllListings));

router.post("/", isLoggedIn, validateListing, wrapAsync(handlePostNewListing));

router.get("/new", isLoggedIn, handleCreateNewListingPage);

router.get("/:id", wrapAsync(handleGetListingById));

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(handlePutListingById)
);

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(handleDeleteListingById));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(handleEditListingPage));

// Review-Routes

router.post("/:id/reviews", isLoggedIn, validateReview, wrapAsync(handlePostNewReview));

router.delete(
  "/:listingId/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(handleDeleteReview)
);

module.exports = router;
