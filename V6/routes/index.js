var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport");


router.get("/",function(req,res){
    res.render("landing.ejs");
});

//==============
//Auth Routes
//==============

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
            });
        }
    });
});


//Login Routes

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){});

//=============
//Logout Routes
//=============

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/campgrounds")
});

//================
//Middleware auth function
//===============

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;