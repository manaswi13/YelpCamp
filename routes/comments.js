var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var comment = require("../models/comments");
var middleware = require("../middleware");
//COMMENTS ROUTE
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
  campground.findById(req.params.id,function(err,campground){
    if(err)
    {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else{
      res.render("new_comment",{campground: campground});
    }
  })
})

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
  campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }
    else{
      comment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        }
        else{
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Comment created successfully🎉");
          res.redirect("/campgrounds/" + campground._id )
        }
      })
    }
  });
});
//Edit Comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
          comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
              console.log(err);
              res.redirect("back");
            } else {
              res.render("edit_comment", {campground_id : req.params.id, comment: foundComment});
            }
          });
});

//Update comment
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
  comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
    if(err){
      console.log(err);
      res.redirect("back");
    } else {
      req.flash("success", "Comment updated successfully");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Delete comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
  comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err){
    if(err){
      console.log(err);
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted successfully");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})



module.exports = router;