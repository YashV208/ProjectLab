var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

//INDEX- all Camopground routes
router.get("/campgrounds",function(req,res){
    Campground.find({},function(error,allCamps){
        if(error){
            console.log("Error Occoured in database find");
        }
        else{
            console.log("Data showd Successfully");
            
        }
        res.render("campgrounds/index.ejs",{sites:allCamps});
        
    });
   
    
});
//CREATE Route
router.post("/campgrounds",function(req,res){
    var namee=req.body.name;
    var imagee=req.body.image;
    var descr=req.body.desc;
    var newCampground={name:namee,img:imagee,desc:descr};
    Campground.create(newCampground,function(error,campground){
        if(error){
            console.log("Error Occoured");
        }
        else{
            console.log("Data Saved Successfully");
            
        }
    });
    res.redirect("/campgrounds");

});
//New Route
router.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/newCampground.ejs");
});
//Show
router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,IdCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show.ejs",{IdCampground:IdCampground});
        }
    });
    
    
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;