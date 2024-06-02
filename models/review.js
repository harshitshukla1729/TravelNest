const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;