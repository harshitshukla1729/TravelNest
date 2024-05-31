const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imageURL:{
        type:String,
        default:'https://images.pexels.com/photos/315998/pexels-photo-315998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;