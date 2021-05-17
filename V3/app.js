var express=require("express");
var app=express();
var request=require("request");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./seeds");


mongoose.connect('mongodb://localhost:27017/Yelp_Campv3', { useNewUrlParser: true , useUnifiedTopology: true });




app.use(bodyParser.urlencoded({extended:true}));

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
            console.log(allCamps);
        }
        res.render("index.ejs",{sites:allCamps});
        
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
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");

});
//New Route
app.get("/campgrounds/new",function(req,res){
    res.render("newCampground.ejs");
});
//Show
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,IdCampground){
        if(err){
            console.log("Error Occoured in Show");
        }
        else{
            res.render("show.ejs",{IdCampground:IdCampground});
        }
    });
    
    
});



var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});