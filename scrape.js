request = require("request");

var quote = function(req,res){

  url = "http://finance.google.com/finance/info?client=ig&q="+req.params.symbol;

  request(url, function (error, response, html) {
    if (!error) {
      res.send(html);
    }
  });
}

var getSymbol = function(req,res){

  url = "https://www.google.ca/finance?q="+req.params.company;

  request(url, function (error, response, html) {
    if (!error) {
      // if "id=rc-1" is in the page, it means that there are multiple results
      // that string refers to the id of the first result.
      var index;
      var symbol_string = "";

      // if there's no results, just send back the string null.

      index = html.indexOf("produced no matches");

      if(index !=-1){
        res.send("null");
      }

      // in this case we look at the symbol of the first result

      index = html.indexOf("id=rc-1");

      if (index != -1){

        var end = index+100;

        symbol_string = html.slice(index,end);
        index = symbol_string.indexOf("q=")+2;
        end = symbol_string.indexOf("&");
        symbol_string = symbol_string.slice(index,end);

      }

      // else, we stumble on the only result for our search
      else{

        index = html.search("including real-time stock quotes");

        var start = index-100;

        symbol_string = html.slice(start,index-2);
        start = symbol_string.indexOf("(");
        symbol_string = symbol_string.slice(start+1);

      }

      res.send(symbol_string);

    }
  });
}

var historical = function(req,res){

  url = "http://www.google.com/finance/getprices?i="+String(parseInt(req.params.interval)*60)+"&p="+req.params.lookback+"d&f=c&df=cpct&q="+req.params.symbol.toUpperCase();

  request(url, function (error, response, html) {
    if (!error) {
      res.send(html);
    }
  });

}

module.exports.quote = quote;
module.exports.getSymbol = getSymbol;
module.exports.historical = historical;
