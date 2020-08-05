var mongoose = require("mongoose");
var campgroundSchema = mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment"
    }
  ],
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user" 
    },
    username: String
  }
});
module.exports = mongoose.model("campground",campgroundSchema);