//YELPCAMP
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var campground = require("./models/campground");
mongoose.connect("mongodb://localhost/yelp_camp");
var flash = require("connect-flash");
var user = require("./models/user");
var campgroundsRoute = require("./routes/campgrounds");
var commentsRoute = require("./routes/comments");
var indexRoute = require("./routes/index");
var methodOverride = require("method-override");


var comment = require("./models/comments");
var seedDB = require("./seeds");
// seedDB();

// campground.create({
//   name: "Wonder Of Dreams", 
//   image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   description: "This would be a great experience!"
// }, function(err,campground){
//   if(err)
//   {
//     console.log(err);
//   }
//   else
//   {
//     console.log("Campground added to database");
//     console.log(campground);
//   }
// });
// var campgrounds = [
//   {name: "Salmon Creek", image: "https://pixabay.com/get/57e3d04a4b51a914f1dc84609620367d1c3ed9e04e507441722979d09344c7_340.jpg"},
//   {name: "Granite Hill", image: "https://pixabay.com/get/55e4d5454b51ab14f1dc84609620367d1c3ed9e04e507441722979d09344c7_340.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/54e8d7464b5bab14f1dc84609620367d1c3ed9e04e507441722979d09344c7_340.jpg"}
// ];


//APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Any secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser =  req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.use(commentsRoute);
app.use("/campgrounds", campgroundsRoute);
app.use(indexRoute);
app.listen(3000,function(){
  console.log("Yelpcamp Server has been started!");
});