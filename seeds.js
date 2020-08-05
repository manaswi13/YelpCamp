var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comments");
var data = [
  {
    name: "The first camp",
    image: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "First camp"
  },
  {
    name: "The second camp",
    image: "https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Second camp"
  },
  {
    name: "The third camp",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Third camp"
  }
];
function seedDB(){
  campground.remove({},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("All Removed!");
  }
  data.forEach(function(seed){
    campground.create(seed,function(err,campground){
      if(err){
        console.log(err);
      }
      else{
        console.log("Created a new campground");
        //Add a new comment
        comment.create(
          {
            text: "This place was awesome, but there was no internet",
            author: "Colt Steele"
          },function(err,comment){
            if(err){
              console.log(err);
            }
            else{
              campground.comments.push(comment);
              campground.save();
            }
            
          });
      }
    });
  });
  });
}




module.exports = seedDB;
