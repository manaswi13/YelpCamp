var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");
router.get("/",function(req,res){
  res.render("landing");
});



//AUTHENTICATION ROUTES
//Sign Up / Register Route
router.get("/register",function(req,res){
  res.render("register");
});
router.post("/register",function(req,res){
  var newUser = new user({username: req.body.username});
  user.register(newUser,req.body.password,function(err,user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success", "Welcome to YelpCamp " + req.body.username);
      res.redirect("/campgrounds");
    });
  });
});

//LOGIN ROUTE
router.get("/login",function(req,res){
  res.render("login");
});
router.post("/login",passport.authenticate("local",{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req,res){
  req.flash("success", "Welcome to YelpCamp " + req.body.username);
});

//LOGOUT ROUTE
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","You signed out successfully!");
  res.redirect("/campgrounds");
});
//MIDDLEWARE
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;