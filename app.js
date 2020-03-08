const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port= 1000;
var router =express.Router();
const path= require('path');
const nodemon= require('nodemon');
const bodyParser=require("body-parser");
app.set('view engine','ejs')

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.Promise=global.Promise;
//database connection
mongoose.connect('mongodb+srv://mihir:1234@cluster0-g4sli.mongodb.net/movie?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology: true},
()=>console.log('connected to DB'));

//models
require("./model/Post");
const Post=mongoose.model("Post")


// get all the post
app.get('/movie',async(req,res)=>{
  Post.find({},function(err,results){
    if(err){
      res.status(500).send(err);
    }
    else {
    res.render('home',{'title':'movie','results':results,message:''});
    }
  });
});

//submit  post
app.post("/movieList",async(req,res)=>{
try {
  const movieList=new Post();
  movieList.name=req.body.name;
  movieList.img=req.body.img;
  movieList.summary=req.body.summary;
  await movieList.save();
  res.send()
} catch (e) {
    res.status(500)
}
})

//for web browser
app.listen(1000,function(){
console.log("server is running on port 1000");
});
