// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 8082;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// example: https://curse-arrow.hyperdev.space/api/timestamp/2023-2-18
// example2: https://curse-arrow.hyperdev.space/api/timestamp/1450137600000

// functions {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
});

// your first API endpoint... 
// Create the timestamp endpoint
app.get("/api/timestamp/:date_str", function (req, res) {
	
  // capturar parametro en url
  const { date_str } = req.params;

  // convert the date
  let date = new Date(date_str);
  
  if ( date === null ) {
    return res.json({
   		unix: null, 
  		utc : "Invalid Date" 
		})
  }
  
  if(date.toString() === 'Invalid Date') {
    // tries again by converting it from unix (which needs to be a number)
    date = new Date(parseInt(date_str));
  }
  
  return res.json({
    unix: date.getTime(), 
  	utc : date.toUTCString() 
	})
})



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});