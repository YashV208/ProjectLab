var express=require("express");
var app=express();
var request=require("request");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seedDB=require("./seeds");


mongoose.connect('mongodb://localhost:27017/Yelp_Campv4', { useNewUrlParser: true , useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

seedDB();
app.get("/",function(req,res){
    res.render("landing.ejs");
});
//INDEX
app.get("/campgrounds",function(req,res){
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
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/newCampground.ejs");
});
//Show
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,IdCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show.ejs",{IdCampground:IdCampground});
        }
    });
    
    
});

//=====================================
//Comment Routes
//=====================================

// New
app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(error,foundId){
        if(error){
            console.log(error);
        }
        else{
            res.render("comments/new.ejs",{foundId:foundId});
        }
    });
    
});

//Comments
app.post("/campgrounds/:id/comments",function(req,res){
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



var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});