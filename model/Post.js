const mongoose=require("mongoose");
const post_schema= mongoose.Schema({
  name: String,
  img: String,
  summary : String
});

module.exports =mongoose.model("Post",post_schema);
