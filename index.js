// index.js
// where your node app starts

// moment.js for date formatting
let moment = require('moment');

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// date request API endpoint
app.get('/api/:date?', (req, res) => {
  // respond with current time if empty date parameter
  if (!req.params.date) {
    const date = new Date();
    res.json({
      unix: date.getTime(),
      utc: moment(date).format('ddd, DD MMM YYYY HH:mm:ss G[M]T')
    })
  } else {
    // variable setup
    let date;
    let dateResponse = {};

    // create date object from parameter
    // account for unix time parameters by converting to number
    if (/\D/.test(req.params.date)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(Number(req.params.date));
    }

    // check date object validity and populate object accordingly
    if (date instanceof Date && !isNaN(date)) {
      dateResponse.unix = date.getTime(),
        dateResponse.utc = moment(date).format('ddd, DD MMM YYYY HH:mm:ss G[M]T')
    } else {
      dateResponse.error = 'Invalid Date'
    }

    // send JSON
    res.json(dateResponse);
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
