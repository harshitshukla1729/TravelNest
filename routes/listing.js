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

const { storage } = require("../cloudConfig");

const multer = require("multer");
const upload = multer({ storage });

// Listing - Routes

router
  .route("/")
  .get(wrapAsync(handleGetAllListings))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(handlePostNewListing)
  );

router.get("/new", isLoggedIn, handleCreateNewListingPage);

router
  .route("/:id")
  .get(wrapAsync(handleGetListingById))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(handlePutListingById)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(handleDeleteListingById));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(handleEditListingPage));

// Review-Routes

router.post(
  "/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(handlePostNewReview)
);

router.delete(
  "/:listingId/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(handleDeleteReview)
);

module.exports = router;
