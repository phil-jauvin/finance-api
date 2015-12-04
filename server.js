express = require("express");
path = require("path");
scrape = require("./scrape");
rateLimit = require('express-rate-limit');

var app = express();

// Limit API call rate
var limiter = rateLimit({delayMs:60000});
app.use('/api/', limiter);

// Use html and css in public
app.use(express.static(path.join(__dirname,"/public")));

// Assign functions to each routes
app.get("/api/quote/:symbol",scrape.quote);
app.get("/api/getsymbol/:company",scrape.getSymbol);
app.get("/api/historical/:symbol/:interval/:lookback",scrape.historical);

// If connection is to anything other than an api route, redirect to the home page
app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

// Listen on port 3000 and print that server is running
app.listen(3000,function(req,res){
  console.log("Server running on port 3000");
});
