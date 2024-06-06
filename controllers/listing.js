const Listing = require("../models/listing");
const Review = require("../models/review");

const handleGetAllListings = async (req, res) => {
  const allListings = await Listing.find({});

  res.render("listings/index", {
    listings: allListings,
  });
};

const handlePostNewListing = async (req, res) => {
  const { title, description, image, price, location, country } = req.body;
  const owner = req.user._id;
  await Listing.create({
    title,
    image,
    description,
    price,
    location,
    country,
    owner,
  });

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

const handleCreateNewListingPage = (req, res) => {
  // console.log(req.user);
  return res.render("listings/new", { user: req.user });
};

const handleGetListingById = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  // console.log(listing.reviews);

  if (!listing) {
    req.flash("error", "Listing does Not Exist");
    res.redirect("/listings");
  }

  res.render("listings/show", {
    listing,
  });
};

const handlePutListingById = async (req, res) => {
  const { title, description, image, price, location, country } = req.body;

  await Listing.findByIdAndUpdate(req.params.id, {
    title,
    description,
    image,
    price,
    location,
    country,
  });

  req.flash("success", "Listing Edited!");
  res.redirect(`/listings/${req.params.id}`);
};

const handleDeleteListingById = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!");
  res.redirect(`/listings`);
};

const handleEditListingPage = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing does Not Exist");
    res.redirect("/listings");
  }

  res.render("listings/edit", {
    listing,
  });
};

const handlePostNewReview = async (req, res) => {
  const { rating, comment } = req.body;

  const author = req.user._id;

  const result = await Review.create({ rating, comment, author });

  const listing = await Listing.findById(req.params.id);

  listing.reviews.push(result);
  await listing.save();

  // console.log("Done");
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${req.params.id}`);
};

const handleDeleteReview = async (req, res) => {
  const { listingId, reviewId } = req.params;

  const review = await Review.findByIdAndDelete(reviewId);

  await Listing.findByIdAndUpdate(listingId, {
    $pull: { reviews: reviewId },
  });

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${listingId}`);
};

module.exports = {
  handleGetAllListings,
  handlePostNewListing,
  handleCreateNewListingPage,
  handleGetListingById,
  handlePutListingById,
  handleDeleteListingById,
  handleEditListingPage,
  handlePostNewReview,
  handleDeleteReview,
};
