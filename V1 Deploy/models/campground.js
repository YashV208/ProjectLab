var mongoose = require("mongoose");
 
var campgroundSchema = new mongoose.Schema({
   name: String,
   img: String,
   desc: String,
   author:{
      id:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"User"
   },
   username:String
},
created:{type: Date, default:Date.now},
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]

});
 
module.exports = mongoose.model("Campground", campgroundSchema);