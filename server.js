express = require("express");

var app = express();

// Use html and css in public
app.use(express.static("public"));

// If connection is to anything other than an api route, redirect to home page
app.get("*",function(req,res){
  res.sendFile("/public/index.html");
});

// Listen on port 3000 and print that server is running
app.listen(3000,function(req,res){
  console.log("Server running on port 3000");
});
