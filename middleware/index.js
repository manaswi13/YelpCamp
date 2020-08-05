var middleware = {};
var campground = require("../models/campground");
var comment = require("../models/comments");
middleware.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      campground.findById(req.params.id, function(err,foundCampground){
        if(err){
          console.log(err);
          res.redirect("back");
        }else{
          if(foundCampground.author.id.equals(req.user._id)){
            next();
          } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect("back");
          }
        }
      })} else {
      req.flash("error", "You need to be logged in first");
      res.redirect("back");
    }}
middleware.checkCommentOwnership =  function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
      comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
          console.log(err);
          res.redirect("back");
        } else {
          if(foundComment.author.id.equals(req.user._id)){
            next();
          } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
              }
        }})}
         else{
            req.flash("error", "You need to be logged in first");
            res.send("You dont have permission");
          }}
        
      
      
  
//MIDDLEWARE
middleware.isLoggedIn = function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in first");
  res.redirect("/login");
};



  module.exports = middleware;