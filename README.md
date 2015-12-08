# finance-api
Unofficial REST API for google finance

This API's homepage (hosted on DigitalOcean): http://159.203.29.155:3000

About

This API is built with Node using the Express framework. It scrapes Google Finance for data and returns it to the user in the form of JSON/Text.

API Calls

Last quote: /api/quote/:symbol

Returns the last quote for a given symbol.

Examples:

/api/quote/GOOG

/api/quote/TSE:BB

Company name to symbol: /api/getsymbol/:company

Returns the symbol for a given company name or null if no symbol is found.

Examples:

/api/getsymbol/google

/api/getsymbol/cibc

Historical price data: /api/historical/:symbol/:interval/:lookback

Returns historical data for a given symbol.

Examples:

/api/historical/RY/5/1 where interval is 5 minutes and lookback 1 day

/api/historical/TD/1/7 where interval is 1 minute and lookback 1 week

Usage
Requests to the demo server are limited to one every 60 seconds (response will be delayed). 
Also, please don't use this for your trading - this API is basically a toy and shouldn't be used for investing purposes.
