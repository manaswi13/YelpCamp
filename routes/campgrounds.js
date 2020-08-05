var express = require("express");
var router = express.Router({mergeParams: true});
var campground = require("../models/campground");
var middleware = require("../middleware");
//INDEX ROUTE
router.get("/", function(req, res){
  campground.find({}, function(err, allCampgrounds){
    if(err)
  {
    console.log(err);
  }
  else
  {
    res.render("campgrounds", {campgrounds: allCampgrounds, currentUser: req.user});
  }
  })
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("new_campground");
})

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, price: price, image: image, description: desc, author: author};
  campground.create(newCampground,function(err,addCampground){
    if(err)
    {
      console.log(err);
    }
    else{
      console.log("added");
    }
  })
  // campgrounds.push(newCampground);
  res.redirect("/campgrounds");
})


//SHOW ROUTE
router.get("/:id",function(req,res){
  campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log(foundCampground);
      res.render("show",{campground: foundCampground});
    }
  });
})

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    campground.findById(req.params.id, function(err,foundCampground){
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
          res.render("edit", {campground: foundCampground});
        }
      })
});
//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else{
      req.flash("success", "Campground updated successfully");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground deleted successfully");
      res.redirect("/campgrounds");
    }
  });
});




module.exports = router;