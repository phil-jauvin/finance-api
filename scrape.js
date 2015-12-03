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
      var index = html.search("id=rc-1");
      var symbol = [];
      var symbol_string = "";

      // if there's no results, just send back null.
      if(html.search("produced no matches")!=-1){
        res.send("null");
      }

      // in this case we look at the symbol of the first result
      if (index != -1){

        while(true){
          index++;
          if (html[index]=="&"){
            break;
          }
        }

        index--;

        while(true){
          if (html[index]=="="){
            break;
          }
          symbol.push(html[index]);
          index--;
        }
        symbol.reverse();
      }

      // else, we stumble on the only result for our search
      else{

        index = html.search("including real-time stock quotes");

        while(true){
          index--;
          if (html[index] == "("){
            break;
          }
        }

        index++;

        while(true){
          if (html[index]==")"){
            break;
          }
          symbol.push(html[index]);
          index++;
        }
      }

      // make a string to send as a response
      for(var i=0;i<symbol.length;i++){
        symbol_string = symbol_string + symbol[i];
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
