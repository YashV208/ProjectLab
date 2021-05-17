var express=require("express");
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var router=express.Router();

//=====================================
//Comment Routes
//=====================================

// New
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(error,foundId){
        
        if(error){
            console.log(error);
        }
        else{
            res.render("comments/new.ejs",{foundId:foundId,currentUser:req.user});
        }
    });
    
});

//Comments
router.post("/campgrounds/:id/comments",function(req,res){
    var authorr=req.body.author;
    var textt=req.body.text;
    var newComment={"text":textt,"author":authorr}
    console.log(newComment);
    Comment.create(newComment,function(error,coment){
        if(error){
            console.log(error);
        }
        else{
            Campground.findById(req.params.id,function(err,foundId){
                if(err){
                    console.log(err);
                }
                else{
                    foundId.comments.push(coment);
                    foundId.save();
                    console.log("comment added");
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
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