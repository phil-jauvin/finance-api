express = require("express");

var app = express();

app.listen(3000,function(req,res){
  console.log("Server running on port 3000");
});
